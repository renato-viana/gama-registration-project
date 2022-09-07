import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
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

  faTrashCan = faTrashCan;
  faPenToSquare = faPenToSquare;

  constructor(
    private companyService: CompanyService,
    private toastr: ToastrService,
    private activeModal: NgbActiveModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.companyService.getCompanies()
      .pipe(take(1))
      .subscribe(
        {
          next: res => this.onSucess(res.content),
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

  redirectToAddCompany(): void {
    this.activeModal.close(this.router.navigate(['company-registration']));
  }

  redirectToUpdateCompany(id: number) {
    this.activeModal.close(this.router.navigate([`company-registration/${id}/update`]));
  }

  deleteCompany(id: number) {
    this.companyService.deleteCompany(id)
      .pipe(take(1))
      .subscribe(
        {
          next: _res => this.onSuccessDelete(),
          error: _error => this.onError()
        }
      )
  }

  onSuccessDelete(): void {
    this.loadCompanies();
    this.toastr.success('Sucesso!', 'Cliente deletado!');
  }

}
