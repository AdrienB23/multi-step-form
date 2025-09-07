import {Component, OnInit} from '@angular/core';
import {TextService} from '../../shared/services/text.service';

@Component({
  selector: 'app-your-info',
  standalone: false,
  templateUrl: './your-info.component.html',
  styleUrl: './your-info.component.scss'
})
export class YourInfoComponent implements OnInit {
  text: {[p: string]: any} = {};

  constructor(private textService: TextService) {}

  ngOnInit() {
    this.textService.getInfoText().subscribe({
      next: data => {
        this.text = data;
      }
    });
  }
}
