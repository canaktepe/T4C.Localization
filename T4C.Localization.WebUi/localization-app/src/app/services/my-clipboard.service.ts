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

  addClipboard(language: Language): void {
      this.clipboard.push(language)
      this.clipboardSubject.next(this.clipboard);
  }

  removeClipboard(language: Language): void {
    this.clipboard = this.clipboard.filter((l:Language)=>{
      return l.languageId !== language.languageId  
    });
    this.clipboardSubject.next(this.clipboard);
  }

  clearClipboard(): void {
    this.clipboard = [];
    this.clipboardSubject.next([]);
  }
}
