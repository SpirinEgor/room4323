import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllAlgorithmsComponent }   from './allAlgorithms/allAlgorithms.component';
import { OfferComponent } from './offer/offer.component';
import { SingleAlgorithmComponent} from './singleAlgorithm/singleAlgorithm.component';

const routes: Routes = [
  { path: '', redirectTo: '/all_algorithms', pathMatch: 'full' },
  { path: 'all_algorithms',  component: AllAlgorithmsComponent },
  { path: 'offer',  component: OfferComponent},
  { path: 'algorithm/:slug', component: SingleAlgorithmComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
