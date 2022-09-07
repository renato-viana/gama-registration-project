import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IConfig, NgxMaskModule } from 'ngx-mask';

import { CompanyTableComponent } from './components/company-table/company-table.component';
import { CustomerTableComponent } from './components/customer-table/customer-table.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) | null = null;

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CompanyTableComponent,
    CustomerTableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxMaskModule.forRoot(),
    FontAwesomeModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CustomerTableComponent,
    CompanyTableComponent,
    NgxMaskModule
  ]
})
export class SharedModule { }
