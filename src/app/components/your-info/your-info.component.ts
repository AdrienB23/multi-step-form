import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {TextService} from '../../shared/services/text.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StepValidationService} from '../../shared/services/step-validation.service';
import {FormDataService} from '../../shared/services/form-data.service';
import {ScreenService} from '../../shared/services/screen.service';

@Component({
  selector: 'app-your-info',
  standalone: false,
  templateUrl: './your-info.component.html',
  styleUrl: './your-info.component.scss'
})
export class YourInfoComponent implements OnInit {
  @Output() formValidChange = new EventEmitter<boolean>();

  text: { [p: string]: any } = {};
  form!: FormGroup;
  value: string | undefined;
  screen = inject(ScreenService);
  loading = true;

  constructor(private fb: FormBuilder, private textService: TextService, private stepValidationService: StepValidationService, private formDataService: FormDataService) {
  }

  ngOnInit() {
    this.loading = true;
    this.textService.getInfoText().subscribe({
      next: data => {
        this.text = data;
        this.loading = false;
      }
    });
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^\\+?[0-9\\s]{7,20}$')]]
    });

    const saved = this.formDataService.getStepData('info');
    if (saved) {
      this.form.patchValue(saved);
    }

    this.validStep();
    this.form.statusChanges.subscribe(() => {
      this.validStep();
    });
  }

  validStep() {
    const isValid = this.form.valid;
    this.stepValidationService.setStepValid('info', isValid);
    this.formValidChange.emit(isValid);
    if (isValid) {
      this.onSubmit();
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.formDataService.setStepData('info', this.form.value);
    }
  }

  protected readonly length = length;
}
