import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Language} from '../models/language';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor(private http: HttpClient) {}

  getLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>('api/languages');
  }

  getByValue(value: string): Observable<Language[]> {
    return this.http
      .get<Language[]>('api/languages/getByValue/'+ value,{
        observe:'response'
    })
      .pipe(
        map(res => {
          return res.body;
        })
      );
  }
}
