import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';

import { CompanyResponse } from '../../models/interfaces/company.interface';
import { CompanyService } from '../../services/company/company.service';

@Component({
  selector: 'app-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss']
})
export class CompanyTableComponent implements OnInit {

  companies: CompanyResponse[] = [];

  constructor(
    private companyService: CompanyService,
    private toastr: ToastrService,
    private activeModal: NgbActiveModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCompanys();
  }

  loadCompanys(): void {
    this.companyService.getCompanies()
      .pipe(take(1))
      .subscribe(
        {
          next: res => this.onSucess(res),
          error: _error => this.onError()
        }
      )
  }

  onSucess(companies: any): void {
    this.companies = companies;
  }

  onError(): void {
    this.toastr.error('Erro!', 'Oops! Algo deu errado :(');
  }

  redirect(): void {
    this.activeModal.close(this.router.navigate(['company-registration']));
  }

}
