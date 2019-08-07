import { Injectable } from '@angular/core';
import { Language } from '../models/language';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyClipboardService {

  clipboard: Language[] = [];
  clipboardSubject = new Subject<Language[]>();

  constructor() { }

  getClipboard(): Observable<Language[]> {
    return this.clipboardSubject.asObservable()
  }

  addClipboard(language: Language): boolean {
    var exists = this.existClipboard(language);
    if (exists) return false;

    this.clipboard.push(language)
    this.clipboardSubject.next(this.clipboard);
    return true;
  }

  existClipboard(language: Language): boolean {
    const exists = this.clipboard.find(l => { return l.languageId == language.languageId });
    return exists != undefined
  }

  removeClipboard(language: Language): void {
    this.clipboard = this.clipboard.filter((l: Language) => {
      return l.languageId !== language.languageId
    });
    this.clipboardSubject.next(this.clipboard);
  }

  clearClipboard(): void {
    this.clipboard = [];
    this.clipboardSubject.next([]);
  }
}
