import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import 'jquery';
import 'bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { AllAlgorithmsService } from './allAlgorithms/allAlgorithms.service';

import { AllAlgorithmsComponent }  from './allAlgorithms/allAlgorithms.component';
import { AppComponent } from './app/app.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AllAlgorithmsComponent,
    AppComponent,
    CreateComponent
  ],
  providers: [
    AllAlgorithmsService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
