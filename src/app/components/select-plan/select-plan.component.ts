import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TextService} from '../../shared/services/text.service';
import {StepValidationService} from '../../shared/services/step-validation.service';
import {Plan} from '../../shared/models/plan';
import {PlanService} from '../../shared/services/plan.service';
import {FormDataService} from '../../shared/services/form-data.service';
import {forkJoin} from 'rxjs';

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
  selectedPlanIndex: number = 0;
  isYearly: boolean = false;


  constructor(private fb: FormBuilder, private textService: TextService, private planService: PlanService, private stepValidation: StepValidationService, private formDataService: FormDataService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      plan: [0, [Validators.required]],
      isYearly: [this.isYearly, [Validators.required]]
    });

    const saved = this.formDataService.getStepData('plan');
    if (saved) {
      this.form.patchValue(saved);
      this.selectedPlanIndex = this.form.value.plan;
      this.isYearly = this.form.value.isYearly;
    }

    forkJoin({
      textData: forkJoin([
        this.textService.getPlanText(),
        this.textService.getPriceText(),
        this.textService.getLabelText()
      ]),
      plans: this.planService.getPlans()
    }).subscribe(({ textData, plans }) => {
      const [plan, price, label] = textData;
      this.text = { ...plan, ...price, ...label };
      this.plans = plans;
    });

    this.form.statusChanges.subscribe(() => {
      const isValid = this.form.valid;
      this.stepValidation.setStepValid('plan', isValid);
      this.formValidChange.emit(isValid);
      if (isValid) {
        this.onSubmit();
      }
    });
  }

  selectPlan(planIndex: number) {
    this.updateForm({ plan: planIndex });
    this.selectedPlanIndex = planIndex;
  }

  selectYearly() {
    this.updateForm({ isYearly: this.isYearly });
  }

  private updateForm(value: Partial<{ plan: number; isYearly: boolean }>) {
    this.form.patchValue(value);
    this.form.updateValueAndValidity();
  }

  onSubmit() {
    if (this.form.valid) {
      this.formDataService.setStepData('plan', this.form.value);
    }
  }
}
