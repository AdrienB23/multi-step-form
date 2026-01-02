import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {AddOns} from '../../shared/models/add-ons';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ScreenService} from '../../shared/services/screen.service';
import {TextService} from '../../shared/services/text.service';
import {AddOnsService} from '../../shared/services/add-ons.service';
import {StepValidationService} from '../../shared/services/step-validation.service';
import {FormDataService} from '../../shared/services/form-data.service';
import {forkJoin} from 'rxjs';
import {Plan} from '../../shared/models/plan';

@Component({
  selector: 'app-summary',
  standalone: false,
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {
  @Output() formValidChange = new EventEmitter<boolean>();

  text: { [p: string]: any } = {};
  addons: AddOns[] = [];
  plan!: Plan;
  form!: FormGroup;
  screen = inject(ScreenService);
  isYearly = false;
  totalPrice = 0;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private textService: TextService,
    private addOnsService: AddOnsService,
    private stepValidation: StepValidationService,
    private formDataService: FormDataService) {
  }

  ngOnInit() {
    this.loading = true;
    this.stepValidation.setStepValid("summary", true);

    const yearlySaved = this.formDataService.getStepData('isYearly');
    if (typeof yearlySaved === 'boolean') {
      this.isYearly = yearlySaved;
    }

    const planSaved = this.formDataService.getStepData('plan');
    if (planSaved) {
      this.plan = planSaved;
    }

    const addonsSaved = this.formDataService.getStepData('addons');
    if (Array.isArray(addonsSaved)) {
      this.addons = addonsSaved;
    }

    forkJoin([
      this.textService.getSummaryText(),
      this.textService.getPriceText(),
      this.textService.getLabelText()
    ]).subscribe(([summary, price, label]) => {
      this.text = {...summary, ...price, ...label};
      this.loading = false;
    });

    this.getTotalPrice();
  }

  getTotalPrice() {
    if (this.isYearly) {
      let addonsPrice = 0;
      this.addons.forEach((addon) => {
        addonsPrice += addon.price_y;
      })
      this.totalPrice = this.plan.price_y + addonsPrice
    } else {
      let addonsPrice = 0;
      this.addons.forEach((addon) => {
        addonsPrice += addon.price_m;
      })
      this.totalPrice = this.plan.price_m + addonsPrice
    }
  }
}
