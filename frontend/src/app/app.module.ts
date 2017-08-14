import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AllAlgorithmsService } from './allAlgorithms/allAlgorithms.service';
import { AllAlgorithmsComponent }  from './allAlgorithms/allAlgorithms.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule
  ],
  declarations: [
    AllAlgorithmsComponent
  ],
  providers: [
    AllAlgorithmsService
  ],
  bootstrap: [
    AllAlgorithmsComponent
  ]
})
export class AppModule { }
