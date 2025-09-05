import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PageEnum } from '../../shared/utils/page-enum';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit, OnDestroy {
  @Input() texts!: { [p: string]: any };
  @Input() screenWidth!: number;
  @Input() page!: PageEnum;
  @Output() pageChange = new EventEmitter<unknown>();
  pages = ['info', 'plan', 'add-ons', 'summary'];

  private routerSub!: Subscription;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.changePage(this.router.url);

    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.changePage(event.urlAfterRedirects);
      }
    });
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }

  changePage(url: string) {
    const cleanUrl = url.replace(/^\/+/, '').split('/')[0];
    const nextPage = cleanUrl || 'info';
    switch (nextPage) {
      case 'info':
        this.page = PageEnum.INFO;
        break;
      case 'plan':
        this.page = PageEnum.PLAN;
        break;
      case 'add-ons':
        this.page = PageEnum.ADD_ONS;
        break;
      case 'summary':
        this.page = PageEnum.SUMMARY;
        break;
      case 'thank-you':
        this.page = PageEnum.THANK_YOU;
        break;
    }
    this.pageChange.emit(this.page);
  }

  protected readonly PageEnum = PageEnum;
}
