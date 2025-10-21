import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {AddOns} from '../../shared/models/add-ons';
import {Plan} from '../../shared/models/plan';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ScreenService} from '../../shared/services/screen.service';
import {TextService} from '../../shared/services/text.service';
import {AddOnsService} from '../../shared/services/add-ons.service';
import {StepValidationService} from '../../shared/services/step-validation.service';
import {FormDataService} from '../../shared/services/form-data.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-thank-you',
  standalone: false,
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.scss'
})
export class ThankYouComponent implements OnInit {
  text: { [p: string]: any } = {};
  screen = inject(ScreenService);

  constructor(
    private textService: TextService) {
  }

  ngOnInit() {
    this.textService.getThankYouText().subscribe((data) => {
      this.text = data;
    })
  }
}
