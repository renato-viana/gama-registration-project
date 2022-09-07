import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyTableComponent } from 'src/app/shared/components/company-table/company-table.component';
import { CustomerTableComponent } from 'src/app/shared/components/customer-table/customer-table.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openCustomerTable() {
    this.modalService.open(CustomerTableComponent, { size: 'xl' });
  }

  openCompanyTable() {
    this.modalService.open(CompanyTableComponent, { size: 'xl' });
  }

}
