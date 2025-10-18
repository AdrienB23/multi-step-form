import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {forkJoin} from 'rxjs';
import {ScreenService} from '../../shared/services/screen.service';
import {TextService} from '../../shared/services/text.service';
import {AddOnsService} from '../../shared/services/add-ons.service';
import {StepValidationService} from '../../shared/services/step-validation.service';
import {FormDataService} from '../../shared/services/form-data.service';
import {AddOns} from '../../shared/models/add-ons';

@Component({
  selector: 'app-add-ons',
  standalone: false,
  templateUrl: './add-ons.component.html',
  styleUrls: ['./add-ons.component.scss']
})
export class AddOnsComponent implements OnInit {
  @Output() formValidChange = new EventEmitter<boolean>();

  text: { [p: string]: any } = {};
  addons: AddOns[] = [];
  selectedAddons: AddOns[] = [];
  form!: FormGroup;
  screen = inject(ScreenService);
  isYearly = false;

  constructor(private fb: FormBuilder, private textService: TextService, private addOnsService: AddOnsService, private stepValidation: StepValidationService, private formDataService: FormDataService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      addons: this.fb.array([]),
    });

    const yearlySaved = this.formDataService.getStepData('isYearly');
    if (typeof yearlySaved === 'boolean') {
      this.isYearly = yearlySaved;
    }

    forkJoin([
      this.textService.getAddText(),
      this.textService.getPriceText(),
      this.addOnsService.getAddOns()
    ]).subscribe(([addon, price, addons]) => {
      this.text = {...addon, ...price};
      this.addons = addons;

      const addonControls = addons.map(() => this.fb.control(false));
      const addonsArray = this.fb.array(addonControls);
      this.form.setControl('addons', addonsArray);

      const savedIndexes = this.formDataService.getStepData('addons');
      if (Array.isArray(savedIndexes)) {
        const formArray = this.form.get('addons') as FormArray;
        savedIndexes.forEach((i: number) => {
          if (formArray.at(i)) formArray.at(i).setValue(true);
        });
      }

      this.validStep();
      this.form.statusChanges.subscribe(() => {
        this.validStep();
      });
    });
  }

  toggleAddon(index: number) {
    const formArray = this.form.get('addons') as FormArray;
    const currentValue = formArray.at(index).value;
    formArray.at(index).setValue(!currentValue);
    this.form.updateValueAndValidity();

    this.onSubmit();
  }

  validStep() {
    const isValid = this.form.valid;
    this.stepValidation.setStepValid('addons', isValid);
    this.formValidChange.emit(isValid);
    if (isValid) {
      this.onSubmit();
    }
  }

  onSubmit() {
    const selectedIndexes = this.form.value.addons
      .map((checked: boolean, i: number) => (checked ? i : null))
      .filter((v: number | null) => v !== null);
    this.formDataService.setStepData('addons', selectedIndexes);
  }
}
