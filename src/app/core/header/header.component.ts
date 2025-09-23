import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { PageEnum } from '../../shared/utils/page-enum';
import {TextService} from '../../shared/services/text.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnChanges  {
  @Input() screenWidth!: number;
  @Input() page!: PageEnum;
  text!: {[p: string]: any};

  currentStep!: number;

  constructor(private textService: TextService) {
  }

  ngOnInit() {
    this.currentStep = this.page;
    this.textService.getHeaderText().subscribe({
      next: data => {
        this.text = data;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['page'] && !changes['page'].isFirstChange()) {
      this.currentStep = changes['page'].currentValue;
    }
  }

}
