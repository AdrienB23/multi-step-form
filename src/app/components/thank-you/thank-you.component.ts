import {Component, inject, OnInit} from '@angular/core';
import {ScreenService} from '../../shared/services/screen.service';
import {TextService} from '../../shared/services/text.service';

@Component({
  selector: 'app-thank-you',
  standalone: false,
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.scss'
})
export class ThankYouComponent implements OnInit {
  text: { [p: string]: any } = {};
  screen = inject(ScreenService);

  constructor(
    private textService: TextService) {
  }

  ngOnInit() {
    this.textService.getThankYouText().subscribe((data) => {
      this.text = data;
    })
  }
}
