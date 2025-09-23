import {Component, HostListener, OnInit} from '@angular/core';
import {PageEnum} from './shared/utils/page-enum';

@Component({
  selector: 'app-root', templateUrl: './app.component.html', standalone: false, styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'multi-step-form';
  screenWidth = window.innerWidth;
  page!: PageEnum;
  formValid = false;

  ngOnInit() {
    this.page = PageEnum.INFO;
  }

  @HostListener('window:resize', ['$event']) getScreenSize() {
    this.screenWidth = window.innerWidth;
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
