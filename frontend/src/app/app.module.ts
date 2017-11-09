import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { MatInputModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { AllAlgorithmsService } from './allAlgorithms/allAlgorithms.service';
import { OfferAlgorithmService } from './offer/offer.service';
import { SingleAlgorithmService} from './singleAlgorithm/singleAlgorithm.service';
import { SignInService } from './signIn/signIn.service';
import { SignUpService} from './signUp/signUp.service';
import { AppService } from './app/app.service';

import { AllAlgorithmsComponent }  from './allAlgorithms/allAlgorithms.component';
import { AppComponent } from './app/app.component';
import { OfferComponent } from './offer/offer.component';
import { SingleAlgorithmComponent} from './singleAlgorithm/singleAlgorithm.component';
import { SignInDialog } from './signIn/signIn.component';
import { SignUpDialog } from './signUp/signUp.component';
import { UserMenu } from './userMenu/userMenu.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    HttpClientXsrfModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AllAlgorithmsComponent,
    AppComponent,
    OfferComponent,
    SingleAlgorithmComponent,
    SignInDialog,
    SignUpDialog,
    UserMenu
  ],
  providers: [
    AllAlgorithmsService,
    OfferAlgorithmService,
    SingleAlgorithmService,
    SignInService,
    SignUpService,
    AppService
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
