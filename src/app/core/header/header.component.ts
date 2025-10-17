import {Component, inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { PageEnum } from '../../shared/utils/page-enum';
import {TextService} from '../../shared/services/text.service';
import {ScreenService} from '../../shared/services/screen.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnChanges  {
  @Input() page!: PageEnum;
  text!: {[p: string]: any};
  screen = inject(ScreenService);

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
