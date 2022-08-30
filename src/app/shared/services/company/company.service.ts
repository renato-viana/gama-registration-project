import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CompanyRequest, CompanyResponse } from '../../models/interfaces/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<CompanyResponse> {
    return this.http.get<CompanyResponse>(`${this.BASE_URL}/companies`);
  }

  addCompany(customer: CompanyRequest): Observable<CompanyResponse> {
    return this.http.post<CompanyResponse>(`${this.BASE_URL}/companies`, customer);
  }

}
