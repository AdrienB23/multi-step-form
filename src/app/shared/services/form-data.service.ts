import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private stepData: any = {};

  setStepData(step: string, data: any) {
    this.stepData[step] = data;
    localStorage.setItem('formData', JSON.stringify(this.stepData));
  }

  getStepData(step: string) {
    if (!Object.keys(this.stepData).length) {
      const saved = localStorage.getItem('formData');
      if (saved) this.stepData = JSON.parse(saved);
    }
    return this.stepData[step];
  }
}
