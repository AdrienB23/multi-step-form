import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;
const FILE_URL = 'assets/data/'

@Injectable({
  providedIn: 'root'
})
export class TextService {

  constructor(private http: HttpClient) { }

  getAllTextsFromDB(): Observable<{ [key: string]: string }> {
    return this.http.get<{ [key: string]: string }>(API_URL + '/texts/');
  }

  getAllTextsFromFile(): Observable<{ [key: string]: string }> {
    return this.http.get<{ [key: string]: string }>(FILE_URL + 'text.json');
  }
}
