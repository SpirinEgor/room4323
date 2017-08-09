import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AllAlgorithmsComponent }  from './allAlgorithms/allAlgorithms.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AllAlgorithmsComponent ],
  bootstrap:    [ AllAlgorithmsComponent ]
})
export class AppModule { }
