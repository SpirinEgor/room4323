import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule} from '@angular/forms';
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
import { SigninDialog } from './signin/signin.component';
import { SignupDialog } from './signup/signup.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdDialogModule,
    FormsModule,
  ],
  declarations: [
    AllAlgorithmsComponent,
    AppComponent,
    CreateComponent,
    SingleAlgorithmComponent,
    SigninDialog,
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
    SigninDialog,
    SignupDialog,
  ]
})
export class AppModule { }
