import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdDialogModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { AllAlgorithmsService } from './allAlgorithms/allAlgorithms.service';
import { CreateAlgorithmService } from './create/create.service';
import { SingleAlgorithmService} from './singleAlgorithm/singleAlgorithm.service';

import { AllAlgorithmsComponent }  from './allAlgorithms/allAlgorithms.component';
import { AppComponent } from './app/app.component';
import { CreateComponent } from './create/create.component';
import { SingleAlgorithmComponent} from './singleAlgorithm/singleAlgorithm.component';
import { LoginDialog } from './login/login.component';
import { SignupDialog } from './signup/signup.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdDialogModule
  ],
  declarations: [
    AllAlgorithmsComponent,
    AppComponent,
    CreateComponent,
    SingleAlgorithmComponent,
    LoginDialog,
    SignupDialog,
  ],
  providers: [
    AllAlgorithmsService,
    CreateAlgorithmService,
    SingleAlgorithmService,
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    LoginDialog,
    SignupDialog,
  ]
})
export class AppModule { }
