import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Cep } from '../../models/interfaces/cep.interface';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) { }

  getViaCep(cep: string): Observable<Cep> {
    cep = cep.replace(/-| |\./g, "").trim();
    return this.http.get<Cep>(`https://viacep.com.br/ws/${cep}/json/`);
  }

}
