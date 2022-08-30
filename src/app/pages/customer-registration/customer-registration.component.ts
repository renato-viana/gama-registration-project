import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Cep } from 'src/app/shared/models/interfaces/cep.interface';
import { CustomerRequest } from 'src/app/shared/models/interfaces/customer.interface';
import { CepService } from 'src/app/shared/services/cep/cep.service';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.scss']
})
export class CustomerRegistrationComponent implements OnInit {

  customerResgitrationForm: FormGroup = {} as FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private cepService: CepService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.customerResgitrationForm = this.fb.group({
      fullName: ['', Validators.required],
      cpf: ['', [Validators.required]],
      cep: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', [Validators.required, Validators.maxLength(30)]],
      state: ['', [Validators.required, Validators.maxLength(20)]],
    });

  }

  validateAllFormFields() {
    Object.keys(this.customerResgitrationForm.controls).forEach(field => {
      const control = this.customerResgitrationForm.get(field);
      control!.markAsTouched();
    });
  }

  onSubmit() {
    if (this.customerResgitrationForm.invalid) {
      this.validateAllFormFields();

      return;
    }
    const customer: CustomerRequest = this.customerResgitrationForm.value;
    this.addCustomer(customer);
  }

  addCustomer(customer: CustomerRequest): void {
    this.customerService.addCustomer(customer)
      .pipe(take(1))
      .subscribe(
        {
          next: _res => this.onSucess(),
          error: _error => this.onError(),
        }
      );
  }

  onSucess(): void {
    this.toastr.success('Successo!', 'Cliente cadastrado');
    this.router.navigate(['dashboard']);
  }

  onError(): void {
    this.toastr.error('Erro!', 'Cliente não cadastrado, tente novamente :(');
  }

  showError(controlName: string): boolean {
    if (!this.customerResgitrationForm.get(controlName)) {
      return false;
    }

    return this.customerResgitrationForm.controls[controlName].invalid && this.customerResgitrationForm.controls[controlName].touched;
  }

  fetchViaCep() {
    this.cepService.getViaCep(this.customerResgitrationForm.value.cep)
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
      this.customerResgitrationForm.patchValue(
        {
          street: cep.logradouro,
          city: cep.localidade,
          state: cep.uf
        }
      )
    }
  }

}
