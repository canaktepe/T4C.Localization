import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Language } from '../models/language';
import { LanguagesService } from '../services/languages.service';
import { Observable, of } from 'rxjs';
import {
  startWith,
  map,
  debounceTime,
  switchMap,
  catchError
} from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  autoCompleteControl = new FormControl('',{validators: Validators.compose([Validators.required, Validators.minLength(3)])});
  languages: Observable<Language[]> = null;

  constructor(private languagesService: LanguagesService,
    private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.languages = this.autoCompleteControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        if (!this.autoCompleteControl.valid) return of(null);
        return this.lookUp(value);
      })
    )
  }

  lookUp(value: string): Observable<Language[]> {
    return this.languagesService.getByValue(value.toLowerCase()).pipe(
      map(results => results),
      catchError(_ => {
        return of(null);
      })
    )
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    let keyword = this.autoCompleteControl.value;
    let message = `#${keyword.languageId} ${keyword.value} has been copied`;
    this.notificationsService.showNotification(message)
    this.autoCompleteControl.reset();
    this.autoCompleteControl.markAsUntouched();
  }
}
