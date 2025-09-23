import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepValidationService {
  private stepsValidity: { [key: string]: boolean } = {
    info: false,
    plan: false,
    'add-ons': false,
  };

  setStepValid(step: string, isValid: boolean) {
    this.stepsValidity[step] = isValid;
  }

  isStepValid(step: string): boolean {
    console.log(`Step "${step}" validity:`, this.stepsValidity[step]);
    return this.stepsValidity[step];
  }
}
