import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { YourInfoComponent } from './components/your-info/your-info.component';
import { HeaderComponent } from './core/header/header.component';
import { SelectPlanComponent } from './components/select-plan/select-plan.component';
import { AddOnsComponent } from './components/add-ons/add-ons.component';
import { SummaryComponent } from './components/summary/summary.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './core/app-routing/app-routing.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './core/footer/footer.component';
import { ButtonDirective, ButtonLabel } from "primeng/button";
import {ReactiveFormsModule} from "@angular/forms";
import {InputText} from 'primeng/inputtext';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import {InputNumber} from 'primeng/inputnumber';
import {InputMask} from 'primeng/inputmask';
import {StyleClass} from 'primeng/styleclass';

@NgModule({
  declarations: [
    AppComponent,
    YourInfoComponent,
    HeaderComponent,
    SelectPlanComponent,
    AddOnsComponent,
    SummaryComponent,
    ThankYouComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ButtonDirective,
    ButtonLabel,
    ReactiveFormsModule,
    InputText,
    InputNumber,
    InputMask,
    StyleClass
  ],
  providers: [
    provideAnimationsAsync(),
    providePrimeNG(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
