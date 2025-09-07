import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {catchError, map, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl + "/texts/";
const FILE_URL = 'assets/data/'

@Injectable({
  providedIn: 'root'
})
export class TextService {

  constructor(private http: HttpClient) { }

  getAllTextsFromDB(): Observable<{ [key: string]: string }> {
    return this.http.get<{ [key: string]: string }>(API_URL);
  }

  getAllTextsFromFile(): Observable<any> {
    return this.http.get<any>(FILE_URL + 'text.json');
  }

  getHeaderText(): Observable<{ [key: string]: any }> {
    return this.getTextByPrefix('header');
  }

  getFooterText(): Observable<{ [key: string]: any }> {
    return this.getTextByPrefix('footer');
  }

  getInfoText(): Observable<{[key: string]: any }> {
    return this.getTextByPrefix('info');
  }

  private getTextByPrefix(prefix: string): Observable<{ [key: string]: any }> {
    return this.http.get<{ [key: string]: any }>(API_URL + prefix).pipe(
      catchError(() => {
        return this.http.get<{ [key: string]: any }>(FILE_URL + 'text.json').pipe(
          map(data => {
            const filteredData: { [key: string]: any } = {};
            Object.keys(data).forEach(key => {
              if (key.startsWith(prefix + '.')) {
                filteredData[key] = data[key];
              }
            });
            console.log(`${prefix} data loaded from local file:`, filteredData);
            return filteredData;
          })
        );
      })
    );
  }
}
