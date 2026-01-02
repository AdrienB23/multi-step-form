import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import { environment } from '../../../environments/environment';
import { AddOns } from '../models/add-ons';

const API_URL = environment.production + '/add-ons/';
const FILE_URL = 'assets/data/'

@Injectable({
  providedIn: 'root'
})
export class AddOnsService {

  constructor(private http: HttpClient) { }

  getAddOns(): Observable<AddOns[]> {
    if (environment.frontendmentor) {
      return this.getAddOnsFromFile();
    }
    return this.http.get<AddOns[]>(API_URL).pipe(
      catchError(() => {
        return this.getAddOnsFromFile();
      })
    );
  }

  private getAddOnsFromFile(): Observable<AddOns[]> {
    return this.http.get<AddOns[]>(FILE_URL + 'add-on.json').pipe(
      map(data => {
        return data;
      })
    );
  }
}
