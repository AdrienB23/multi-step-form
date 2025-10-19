import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TextService} from '../../shared/services/text.service';
import {StepValidationService} from '../../shared/services/step-validation.service';
import {Plan} from '../../shared/models/plan';
import {PlanService} from '../../shared/services/plan.service';
import {FormDataService} from '../../shared/services/form-data.service';
import {forkJoin} from 'rxjs';
import {ScreenService} from '../../shared/services/screen.service';

@Component({
  selector: 'app-select-plan',
  standalone: false,
  templateUrl: './select-plan.component.html',
  styleUrl: './select-plan.component.scss'
})
export class SelectPlanComponent implements OnInit {
  @Output() formValidChange = new EventEmitter<boolean>();

  text: { [p: string]: any } = {};
  plans: Plan[] = [];
  form!: FormGroup;
  selectedPlan: Plan | null = null;
  isYearly: boolean = false;
  screen = inject(ScreenService);


  constructor(
    private fb: FormBuilder,
    private textService: TextService,
    private planService: PlanService,
    private stepValidation: StepValidationService,
    private formDataService: FormDataService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      plan: [this.selectedPlan, [Validators.required]],
      isYearly: [this.isYearly, [Validators.required]]
    });

    const savedPlan = this.formDataService.getStepData('plan');
    const savedYearly = this.formDataService.getStepData('isYearly');
    if (typeof savedYearly === 'boolean') {
      this.isYearly = savedYearly;
      this.form.patchValue({ isYearly: this.isYearly });
    }

    forkJoin({
      textData: forkJoin([
        this.textService.getPlanText(),
        this.textService.getPriceText(),
        this.textService.getLabelText()
      ]),
      plans: this.planService.getPlans()
    }).subscribe(({textData, plans}) => {
      const [plan, price, label] = textData;
      this.text = {...plan, ...price, ...label};
      this.plans = plans;

      if (savedPlan) {
        const found = this.plans.find(p => p.name === savedPlan.name);
        if (found) {
          this.selectedPlan = found;
          this.form.patchValue({
            plan: found,
            isYearly: this.isYearly
          });
        }
      }
      this.validStep();
    });

    this.form.statusChanges.subscribe(() => {
      this.validStep();
    });
  }

  validStep() {
    const isValid = this.form.valid && this.selectedPlan !== null;
    this.stepValidation.setStepValid('plan', isValid);
    this.formValidChange.emit(isValid);
    if (isValid) {
      this.onSubmit();
    }
  }

  selectPlan(plan: Plan) {
    this.selectedPlan = plan;
    this.updateForm({ plan: plan, isYearly: this.isYearly });
    this.onSubmit();
  }

  selectYearly() {
    this.updateForm({isYearly: this.isYearly});
    this.onSubmit()
  }

  private updateForm(value: Partial<{ plan: Plan; isYearly: boolean }>) {
    this.form.patchValue(value);
    this.form.updateValueAndValidity();
  }

  onSubmit() {
    if (this.form.valid && this.selectedPlan) {
      this.formDataService.setStepData('plan', this.selectedPlan);
      this.formDataService.setStepData('isYearly', this.isYearly);
    }
  }
}
