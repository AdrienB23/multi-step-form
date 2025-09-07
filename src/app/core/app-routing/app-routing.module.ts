import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SelectPlanComponent} from '../../components/select-plan/select-plan.component';
import {AddOnsComponent} from '../../components/add-ons/add-ons.component';
import {SummaryComponent} from '../../components/summary/summary.component';
import {ThankYouComponent} from '../../components/thank-you/thank-you.component';
import {YourInfoComponent} from '../../components/your-info/your-info.component';

export const routes: Routes = [
  {path: '', redirectTo: 'info', pathMatch: 'full'},
  {
    path: 'info',
    component: YourInfoComponent
  },
  {
    path: 'plan',
    component: SelectPlanComponent
  },
  {
    path: 'add-ons',
    component: AddOnsComponent
  },
  {
    path: 'summary',
    component: SummaryComponent
  },
  {
    path: 'thank-you',
    component: ThankYouComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
