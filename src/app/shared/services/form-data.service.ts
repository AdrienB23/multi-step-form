import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private data: any = {};

  setStepData(step: string, values: any) {
    this.data[step] = values;
  }

  getStepData(step: string) {
    return this.data[step] || {};
  }
}
