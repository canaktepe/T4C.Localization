import { Component, OnInit } from '@angular/core';
import { Language } from '../models/language';
import { MyClipboardService } from '../services/my-clipboard.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  clipboard: Language[] = [];

  constructor(private myClipboardService:MyClipboardService) { }

  ngOnInit() {
      this.myClipboardService.clipboardSubject.subscribe(data=>{
        this.clipboard = data;
      })
  }

  addClipboard(language:Language){
    this.myClipboardService.addClipboard(language);
  }

  removeClipboard(language:Language){
    this.myClipboardService.removeClipboard(language);
  }

  clearClipBoard():void{
    this.myClipboardService.clearClipboard();
  }
}
