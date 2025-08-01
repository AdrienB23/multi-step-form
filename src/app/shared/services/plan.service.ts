import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan } from '../models/plan';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl + '/plans/';
const FILE_URL = 'assets/data/'

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }

  getPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(API_URL);
  }

  getPlansFromFile(): Observable<Plan[]> {
    return this.http.get<Plan[]>(FILE_URL + 'plan.json');
  }
}
