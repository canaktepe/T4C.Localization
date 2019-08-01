import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material-module';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LanguageComponent} from './language/language.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule
  ],
  declarations: [AppComponent, LanguageComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {}
