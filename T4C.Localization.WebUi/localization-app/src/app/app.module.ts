import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material-module';
import {ClipboardModule} from 'ngx-clipboard';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LanguageComponent} from './language/language.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

@NgModule({
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      MaterialModule,
      ClipboardModule,
      ReactiveFormsModule,
      HttpClientModule,
      AppRoutingModule
   ],
   declarations: [
      AppComponent,
      LanguageComponent,
      NavMenuComponent
   ],
   bootstrap: [
      AppComponent
   ],
   providers: []
})
export class AppModule {}