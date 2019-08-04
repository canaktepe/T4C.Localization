import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Language} from '../models/language';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  constructor(private http: HttpClient) {}

  getLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(`api/languages`);
  }

  lookUp(value: string): Observable<Language[]> {
    return this.http
      .get<Language[]>(`api/languages/lookUp/${value}`, {
        observe: 'response'
      })
      .pipe(
        map(res => {
          return res.body;
        })
      );
  }

  addLanguage(value: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8'
      })
    };
    return this.http.post('api/languages', JSON.stringify(value), httpOptions);
  }

  getLastLanguageItems(count: number): Observable<Language[]> {
    return this.http
      .get<Language[]>(`api/languages/getLastLanguageItems/${count}`, {
        observe: 'response'
      })
      .pipe(
        map(res => {
          return res.body;
        })
      );
  }
}
