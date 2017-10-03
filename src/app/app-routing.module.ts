import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EIDetailComponent }  from './ei-detail.component';
import { EISComponent }      from './eis.component';
import { EICreateFormComponent } from './ei-create.component'

const routes: Routes = [
  { path: '', redirectTo: '/eis', pathMatch: 'full' },
  { path: 'detail/:Ref', component: EIDetailComponent },
  { path: 'eis',      component: EISComponent  },
  {path:'create',component: EICreateFormComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
