import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import { Plan } from '../models/plan';
import { environment } from '../../../environments/environment';

const API_URL = environment.production + '/plans/';
const FILE_URL = 'assets/data/'

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }

  getPlans(): Observable<Plan[]> {
    if (environment.frontendmentor) {
      return this.getPlansFromFile();
    }
    return this.http.get<Plan[]>(API_URL).pipe(
      catchError(() => {
        return this.getPlansFromFile();
      })
    );
  }

  private getPlansFromFile(): Observable<Plan[]> {
    return this.http.get<Plan[]>(FILE_URL + 'plan.json').pipe(
      map(data => {
        return data;
      })
    );
  }
}
