import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LanguageComponent} from './language/language.component';

const routes: Routes = [
  {path: '*', component: LanguageComponent, pathMatch: 'full'},
  {path: 'language', component: LanguageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
