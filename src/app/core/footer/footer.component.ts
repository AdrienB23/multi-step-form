import {Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { PageEnum } from '../../shared/utils/page-enum';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {TextService} from '../../shared/services/text.service';
import {StepValidationService} from '../../shared/services/step-validation.service';
import {ScreenService} from '../../shared/services/screen.service';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit, OnDestroy {
  @Input() page!: PageEnum;
  @Input() formValid!: boolean;
  @Output() pageChange = new EventEmitter<unknown>();
  pages = ['info', 'plan', 'addons', 'summary'];
  text!: { [p: string]: any };
  screen = inject(ScreenService);

  private routerSub!: Subscription;

  constructor(private router: Router, private textService: TextService, protected stepValidationService: StepValidationService) {
  }

  ngOnInit() {
    this.getText();
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

  getText() {
    this.textService.getFooterText().subscribe({
      next: data => {
        this.text = data;
      },
      error: err => {
        console.error("Impossible de charger les textes de pied de page depuis le backend.", err);
      }
    });
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
      case 'addons':
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
