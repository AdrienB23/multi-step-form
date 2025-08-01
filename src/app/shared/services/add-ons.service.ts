import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AddOns } from '../models/add-ons';

const API_URL = environment.apiUrl + '/add-ons/';
const FILE_URL = 'assets/data/'

@Injectable({
  providedIn: 'root'
})
export class AddOnsService {

  constructor(private http: HttpClient) { }

  getAddOns(): Observable<AddOns[]> {
    return this.http.get<AddOns[]>(API_URL);
  }

  getAddOnsFromFile(): Observable<AddOns[]> {
    return this.http.get<AddOns[]>(FILE_URL + 'add-on.json');
  }
}
