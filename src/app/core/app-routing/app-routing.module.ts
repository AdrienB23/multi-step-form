import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YourInfoComponent } from '../../components/your-info/your-info.component';
import { SelectPlanComponent } from '../../components/select-plan/select-plan.component';
import { AddOnsComponent } from '../../components/add-ons/add-ons.component';
import { SummaryComponent } from '../../components/summary/summary.component';
import { ThankYouComponent } from '../../components/thank-you/thank-you.component';

export const routes: Routes = [
  { path: '', redirectTo: 'your-info', pathMatch: 'full' },
  { path: 'your-info', component: YourInfoComponent },
  { path: 'select-plan', component: SelectPlanComponent },
  { path: 'add-ons', component: AddOnsComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'thank-you', component: ThankYouComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
