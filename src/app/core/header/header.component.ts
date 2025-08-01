import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() screenWidth!: number;
  @Input() navItems!: string[];
  @Input() texts!: {[p: string]: any};

  currentStep = 1;

}
