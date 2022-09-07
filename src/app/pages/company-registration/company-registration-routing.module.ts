import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanyRegistrationComponent } from './company-registration.component';

const routes: Routes = [
  {
    path: "",
    component: CompanyRegistrationComponent
  },
  {
    path: ":id/update",
    component: CompanyRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRegistrationRoutingModule { }
