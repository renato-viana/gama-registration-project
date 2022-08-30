import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CustomerRequest, CustomerResponse } from '../../models/interfaces/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(`${this.BASE_URL}/customers`);
  }

  addCustomer(customer: CustomerRequest): Observable<CustomerResponse> {
    return this.http.post<CustomerResponse>(`${this.BASE_URL}/customers`, customer);
  }

}
