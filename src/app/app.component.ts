import {Component, inject, OnInit} from '@angular/core';
import {PageEnum} from './shared/utils/page-enum';
import {ScreenService} from './shared/services/screen.service';

@Component({
  selector: 'app-root', templateUrl: './app.component.html', standalone: false, styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'multi-step-form';
  screen = inject(ScreenService);
  page!: PageEnum;
  formValid = false;

  ngOnInit() {
    this.page = PageEnum.INFO;
  }

  onRouteActivate(component: any) {
    if (component.formValidChange) {
      component.formValidChange.subscribe((valid: boolean) => {
        this.formValid = valid;
      });
    }
  }

  protected readonly PageEnum = PageEnum;
}
