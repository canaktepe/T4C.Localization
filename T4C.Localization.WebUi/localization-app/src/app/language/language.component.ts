import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Language } from '../models/language';
import { LanguagesService } from '../services/languages.service';
import { Observable, of, Subject } from 'rxjs';
import {
  startWith,
  map,
  debounceTime,
  switchMap,
  catchError
} from 'rxjs/operators';
import { NotificationsService } from '../services/notifications.service';
import { ClipboardService } from 'ngx-clipboard';
import { MyClipboardService } from '../services/my-clipboard.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css'],
})
export class LanguageComponent implements OnInit {
  private lastItemCount = 18;
  private keyMinLength = 2;
  autoCompleteControl = new FormControl('', {
    validators: Validators.compose([
      Validators.required,
      Validators.minLength(this.keyMinLength)
    ])
  });
  private keyword: string;
  languages: Observable<Language[]> = null;
  lastLanguageItems: Language[] = [];
  _lastLanguageItems = new Subject<Language[]>();

  constructor(
    private languagesService: LanguagesService,
    private notificationsService: NotificationsService,
    private clipboardService: ClipboardService,
    private myClipboardService: MyClipboardService
  ) { }

  ngOnInit() {
    this.languages = this.autoCompleteControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        if (!this.autoCompleteControl.valid) {
          return of(null);
        }
        this.keyword = value;
        return this.lookUp(encodeURIComponent(value));
      })
    );
    this.languagesService
      .getLastLanguageItems(this.lastItemCount)
      .subscribe(value => {
        this.lastLanguageItems = value;
        this._lastLanguageItems.next(this.lastLanguageItems);
      });
  }

  lookUp(value: string): Observable<Language[]> {
    if (!this.autoCompleteControl.valid) {
      return;
    }
    return this.languagesService.lookUp(value.toLowerCase()).pipe(
      map(results => results),
      catchError(_ => {
        return of(null);
      })
    );
  }

  onSelectionChanged() {
    const keyword = this.autoCompleteControl.value;
    if (!keyword) {
      this.addKeyword(this.keyword);
      return;
    }
    this.copyClipboard(keyword);
  }

  copyClipboard(keyword) {
    const copyText = `${keyword.languageId}\t${keyword.value}`;
    this.clipboardService.copyFromContent(copyText);
    const message = `#${copyText} has been copied`;

    const added = this.myClipboardService.addClipboard(keyword);
    if (added) {
      this.notificationsService.showNotification(message);
    }
    this.resetKeywordInput();
  }

  getLanguagesCount(): number {
    let count = 0;
    this.languages.subscribe((lang: Language[]) => {
      count = lang ? lang.length : 0;
    });
    return count;
  }

  addKeyword(keyword: string) {
    this.languagesService.addLanguage(keyword).subscribe(
      (lang: Language) => {
        if (lang == null) {
          this.notificationsService.showNotification(
            `this keyword has already been added! copied clipboard...`
          );
          return;
        }

        if (this.lastLanguageItems.length >= this.lastItemCount)
          this.lastLanguageItems.pop();

        this.lastLanguageItems.unshift(lang);
        this._lastLanguageItems.next(this.lastLanguageItems);

        this.notificationsService.showNotification(
          `added new language item #${lang.languageId} ${lang.value}`
        );

        this.myClipboardService.addClipboard(lang);
        this.copyClipboard(lang);
        this.resetKeywordInput();
      },
      err => {
        const keyword = err.error;
        this.myClipboardService.addClipboard(keyword);
        this.copyClipboard(keyword);
      }
    );
  }

  resetKeywordInput() {
    this.autoCompleteControl.reset();
    this.autoCompleteControl.markAsUntouched();
  }
}
