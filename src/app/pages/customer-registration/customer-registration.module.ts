import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { CustomerRegistrationRoutingModule } from './customer-registration-routing.module';
import { CustomerRegistrationComponent } from './customer-registration.component';


@NgModule({
  declarations: [
    CustomerRegistrationComponent
  ],
  imports: [
    CommonModule,
    CustomerRegistrationRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CustomerRegistrationModule { }
