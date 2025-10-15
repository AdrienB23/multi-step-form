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
  selectedPlanIndex?: number;
  isYearly: boolean = false;


  constructor(private fb: FormBuilder, private textService: TextService, private planService: PlanService, private stepValidation: StepValidationService, private formDataService: FormDataService) {
  }

  ngOnInit() {
    forkJoin([
      this.textService.getPlanText(),
      this.textService.getPriceText()
    ]).subscribe(([plan, price]) => {
      this.text = { ...plan, ...price };
    });
    this.planService.getPlans().subscribe({
      next: data => {
        console.log(data);
        this.plans = data;
      }
    });
    this.form = this.fb.group({
      plan: ['', [Validators.required]]
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

  selectPlan(planId: number) {
    this.selectedPlanIndex = planId;
  }

  onSubmit() {
    if (this.form.valid) {
      this.formDataService.setStepData('plan', this.form.value);
    }
  }
}
