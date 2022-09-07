import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ApiResponse } from '../../models/interfaces/api-response.interface';
import { CompanyRequest, CompanyResponse } from '../../models/interfaces/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.BASE_URL}/companies`);
  }

  getCompany(id: number): Observable<CompanyResponse> {
    return this.http.get<CompanyResponse>(`${this.BASE_URL}/companies/${id}`);
  }

  addCompany(customer: CompanyRequest): Observable<CompanyResponse> {
    return this.http.post<CompanyResponse>(`${this.BASE_URL}/companies`, customer);
  }

  updateCompany(id: number, customer: CompanyRequest): Observable<CompanyResponse> {
    return this.http.put<CompanyResponse>(`${this.BASE_URL}/companies/${id}`, customer);
  }

  deleteCompany(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/companies/${id}`);
  }

}
