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
import { SignInDialog } from './signIn/signIn.component';
import { SignUpDialog } from './signUp/signUp.component';

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
    SignInDialog,
    SignUpDialog,
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
    SignInDialog,
    SignUpDialog,
  ]
})
export class AppModule { }
