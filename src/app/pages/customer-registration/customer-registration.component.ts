import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  idCustomer!: number;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private cepService: CepService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.initializeForm();

    this.idCustomer = Number(this.route.snapshot.paramMap.get('id'));

    if (this.isUpdating()) {
      this.loadCustomer();
    }

  }

  initializeForm() {
    this.customerResgitrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]],
      cep: ['', Validators.required],
      endereco: ['', Validators.required],
      city: ['', [Validators.required, Validators.maxLength(30)]],
      country: ['', [Validators.required, Validators.maxLength(60)]],
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

    if (this.isUpdating()) {
      this.updateCustomer(this.idCustomer, customer);
      return;
    }

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

  updateCustomer(id: number, customer: CustomerRequest) {
    this.customerService.updateCustomer(id, customer)
      .pipe(take(1))
      .subscribe(
        {
          next: res => this.onSucessUpdate(),
          error: _error => this.onErrorUpdate(),
        }

      )
  }

  onSucessUpdate(): void {
    this.router.navigate([`dashboard`]);
    this.toastr.success('Successo!', 'Cliente atualizado');
  }

  onErrorUpdate(): void {
    this.toastr.error('Erro!', 'Cliente não atualizado, tente novamente :(');
  }

  loadCustomer() {

    this.customerService.getCustomer(this.idCustomer)
      .pipe(take(1))
      .subscribe(
        {
          next: res => this.onSucessLoadCustomer(res),
          error: _error => this.onErrorLoadCustomer(),
        }

      )
  }

  onSucessLoadCustomer(customer: CustomerRequest): void {
    this.customerResgitrationForm.patchValue(customer);
  }

  onErrorLoadCustomer(): void {
    this.toastr.error('Erro!', 'Dados do cliente não foram carregados, tente novamente :(');
  }

  isUpdating = () => Boolean(this.idCustomer);

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
          endereco: cep.logradouro,
          city: cep.localidade,
        }
      )
    }
  }

}
