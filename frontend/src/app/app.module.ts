import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AllAlgorithmsService } from './allAlgorithms/allAlgorithms.service';
import { CreateAlgorithmService } from './create/create.service';
import { SingleAlgorithmService} from './singleAlgorithm/singleAlgorithm.service';

import { AllAlgorithmsComponent }  from './allAlgorithms/allAlgorithms.component';
import { AppComponent } from './app/app.component';
import { CreateComponent } from './create/create.component';
import { SingleAlgorithmComponent} from './singleAlgorithm/singleAlgorithm.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
  ],
  declarations: [
    AllAlgorithmsComponent,
    AppComponent,
    CreateComponent,
    SingleAlgorithmComponent,
  ],
  providers: [
    AllAlgorithmsService,
    CreateAlgorithmService,
    SingleAlgorithmService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
