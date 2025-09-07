import { Component, HostListener, OnInit } from '@angular/core';
import { PageData } from './shared/models/page-data';
import { PageEnum } from './shared/utils/page-enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'multi-step-form';
  texts!: { [p: string]: any };
  data!: PageData;
  screenWidth = window.innerWidth;
  page!: PageEnum;

  ngOnInit() {
    this.page = PageEnum.INFO;
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.innerWidth;
  }

  protected readonly PageEnum = PageEnum;
}
