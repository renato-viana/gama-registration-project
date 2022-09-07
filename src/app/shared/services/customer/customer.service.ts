import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ApiResponse } from '../../models/interfaces/api-response.interface';
import { CustomerRequest, CustomerResponse } from '../../models/interfaces/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.BASE_URL}/customers`);
  }

  getCustomer(id: number): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(`${this.BASE_URL}/customers/${id}`);
  }

  addCustomer(customer: CustomerRequest): Observable<CustomerResponse> {
    return this.http.post<CustomerResponse>(`${this.BASE_URL}/customers`, customer);
  }

  updateCustomer(id: number, customer: CustomerRequest): Observable<CustomerResponse> {
    return this.http.put<CustomerResponse>(`${this.BASE_URL}/customers/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/customers/${id}`);
  }

}
