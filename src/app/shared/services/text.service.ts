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

  getHeaderText(): Observable<{ [key: string]: any }> {
    return this.getTextByPrefix('header');
  }

  getFooterText(): Observable<{ [key: string]: any }> {
    return this.getTextByPrefix('footer');
  }

  getInfoText(): Observable<{[key: string]: any }> {
    return this.getTextByPrefix('info');
  }

  getPlanText(): Observable<{[key: string]: any }> {
    return this.getTextByPrefix('plan');
  }

  getPriceText(): Observable<{ [key: string]: any }> {
    return this.getTextByPrefix('price');
  }

  getLabelText(): Observable<{ [key: string]: any }> {
    return this.getTextByPrefix('label');
  }

  private getTextByPrefix(prefix: string): Observable<{ [key: string]: any }> {
    if (environment.frontendmentor) {
      return this.getTextByPrefixFromFile(prefix);
    }
    return this.http.get<{ [key: string]: any }>(API_URL + prefix).pipe(
      catchError(() => {
        return this.getTextByPrefixFromFile(prefix);
      })
    );
  }

  private getTextByPrefixFromFile(prefix: string): Observable<{ [key: string]: any }> {
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
  }
}
