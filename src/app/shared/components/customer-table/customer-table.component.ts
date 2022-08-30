import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
          next: res => this.onSucess(res),
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

  redirect(): void {
    this.activeModal.close(this.router.navigate(['customer-registration']));
  }

}
