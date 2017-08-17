import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllAlgorithmsComponent }   from './allAlgorithms/allAlgorithms.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  { path: '', redirectTo: '/all_algorithms', pathMatch: 'full' },
  { path: 'all_algorithms',  component: AllAlgorithmsComponent },
  { path: 'create',  component: CreateComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
