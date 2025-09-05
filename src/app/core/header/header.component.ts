import { Component, Input, OnInit } from '@angular/core';
import { PageEnum } from '../../shared/utils/page-enum';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Input() screenWidth!: number;
  @Input() navItems!: string[];
  @Input() texts!: {[p: string]: any};
  @Input() page!: PageEnum;

  currentStep!: number;

  ngOnInit() {
    this.currentStep = this.page;
  }

}
