import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Cep } from 'src/app/shared/models/interfaces/cep.interface';
import { CompanyRequest } from 'src/app/shared/models/interfaces/company.interface';
import { CepService } from 'src/app/shared/services/cep/cep.service';
import { CompanyService } from 'src/app/shared/services/company/company.service';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss']
})
export class CompanyRegistrationComponent implements OnInit {

  companyResgitrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private toastr: ToastrService,
    private cepService: CepService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.companyResgitrationForm = this.fb.group({
      sender: ['', Validators.required],
      cnpj: ['', [Validators.required]],
      cep: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', [Validators.required, Validators.maxLength(30)]],
      state: ['', [Validators.required, Validators.maxLength(20)]],
      deliveryFee: ['', Validators.required]
    });
  }

  validateAllFormFields() {
    Object.keys(this.companyResgitrationForm.controls).forEach(field => {
      const control = this.companyResgitrationForm.get(field);
      control!.markAsTouched();
    });
  }

  onSubmit() {
    if (this.companyResgitrationForm.invalid) {
      this.validateAllFormFields();

      return;
    }
    const company: CompanyRequest = this.companyResgitrationForm.value;
    this.addCompany(company);
  }

  addCompany(company: CompanyRequest): void {
    const companyAdded = this.companyService.addCompany(company)
      .pipe(take(1))
      .subscribe(
        {
          next: _res => this.onSucess(),
          error: _error => this.onError(),
        }
      );
    console.log(company);
  }

  onSucess(): void {
    this.toastr.success('Successo!', 'Empresa cadastrada');
    this.router.navigate(['dashboard']);
  }

  onError(): void {
    this.toastr.error('Erro!', 'Empresa não cadastrada, tente novamente :(');
  }

  showError(controlName: string): boolean {
    if (!this.companyResgitrationForm.get(controlName)) {
      return false;
    }

    return this.companyResgitrationForm.controls[controlName].invalid && this.companyResgitrationForm.controls[controlName].touched;
  }

  fetchViaCep() {
    this.cepService.getViaCep(this.companyResgitrationForm.value.cep)
      .pipe(take(1))
      .subscribe(
        {
          next: cep => this.setFormAddressFields(cep),
          error: _error => this.onErrorFecthViaCep()
        }
      );
  }

  onErrorFecthViaCep(): void {
    this.toastr.error('Erro!', 'CEP não encontrado, tente novamente :(');
  }

  setFormAddressFields(cep: Cep): void {
    if (cep) {
      this.companyResgitrationForm.patchValue(
        {
          street: cep.logradouro,
          city: cep.localidade,
          state: cep.uf
        }
      )
    }
  }

}
