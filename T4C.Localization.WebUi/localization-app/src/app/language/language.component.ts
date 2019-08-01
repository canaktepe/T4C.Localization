import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Language} from '../models/language';
import {LanguagesService} from '../services/languages.service';
import { Observable, observable, of } from 'rxjs';
import {
  startWith,
  map,
  debounceTime,
  mergeMapTo,
  mergeMap,
  switchMap,
  catchError
} from 'rxjs/operators';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  autoCompleteControl = new FormControl();
  languages: Observable<Language[]> = null;

  constructor(private languagesService: LanguagesService) {}

  ngOnInit() {
  this.languages=   this.autoCompleteControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value=>{
        if(value.length>=3){
          return this.lookUp(value);
        }
        else{
          return of(null);
        }
      })
    )
  }

  lookUp(value:string):Observable<Language[]>{
    return this.languagesService.getByValue(value.toLowerCase()).pipe(
      map(results=>results),
      catchError(_=>{
        return of(null);
      })
    )
  }
}
