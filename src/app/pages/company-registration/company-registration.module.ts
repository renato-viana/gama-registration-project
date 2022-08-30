import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { CompanyRegistrationRoutingModule } from './company-registration-routing.module';
import { CompanyRegistrationComponent } from './company-registration.component';


@NgModule({
  declarations: [
    CompanyRegistrationComponent
  ],
  imports: [
    CommonModule,
    CompanyRegistrationRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CompanyRegistrationModule { }
