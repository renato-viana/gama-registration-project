import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { CustomerResponse } from 'src/app/shared/models/interfaces/customer.interface';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent implements OnInit {

  customers: CustomerResponse[] = [];

  faTrashCan = faTrashCan;
  faPenToSquare = faPenToSquare;

  constructor(
    private customerService: CustomerService,
    private toastr: ToastrService,
    private activeModal: NgbActiveModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers()
      .pipe(take(1))
      .subscribe(
        {
          next: res => this.onSucess(res.content),
          error: _error => this.onError()
        }
      )
  }

  onSucess(cutomers: any): void {
    this.customers = cutomers;
  }

  onError(): void {
    this.toastr.error('Erro!', 'Oops! Algo deu errado :(');
  }

  redirectToAddCustomer(): void {
    this.activeModal.close(this.router.navigate(['customer-registration']));
  }

  redirectToUpdateCustomer(id: number) {
    this.activeModal.close(this.router.navigate([`customer-registration/${id}/update`]));
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id)
      .pipe(take(1))
      .subscribe(
        {
          next: _res => this.onSuccessDelete(),
          error: _error => this.onError()
        }
      )
  }

  onSuccessDelete(): void {
    this.loadCustomers();
    this.toastr.success('Sucesso!', 'Cliente deletado!');
  }

}
