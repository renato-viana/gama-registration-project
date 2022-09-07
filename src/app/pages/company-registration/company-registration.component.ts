import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  idCompany!: number;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private toastr: ToastrService,
    private cepService: CepService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.initializeForm();

    this.idCompany = Number(this.route.snapshot.paramMap.get('id'));

    if (this.isUpdating()) {
      this.loadCompany();
    }

  }

  initializeForm() {
    this.companyResgitrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cnpj: ['', [Validators.required]],
      cep: ['', Validators.required],
      endereco: ['', Validators.required],
      city: ['', [Validators.required, Validators.maxLength(30)]],
      country: ['', [Validators.required, Validators.maxLength(60)]],
      price: ['', Validators.required]
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

    if (this.isUpdating()) {
      this.updateCompany(this.idCompany, company);
      return;
    }

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

  updateCompany(id: number, company: CompanyRequest) {
    this.companyService.updateCompany(id, company)
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
    this.toastr.success('Successo!', 'Empresa atualizada');
  }

  onErrorUpdate(): void {
    this.toastr.error('Erro!', 'Empresa não atualizado, tente novamente :(');
  }

  loadCompany() {

    this.companyService.getCompany(this.idCompany)
      .pipe(take(1))
      .subscribe(
        {
          next: res => this.onSucessLoadCompany(res),
          error: _error => this.onErrorLoadCompany(),
        }

      )
  }

  onSucessLoadCompany(company: CompanyRequest): void {
    this.companyResgitrationForm.patchValue(company);
  }

  onErrorLoadCompany(): void {
    this.toastr.error('Erro!', 'Dados da empresa não foram carregados, tente novamente :(');
  }

  isUpdating = () => Boolean(this.idCompany);

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
          endereco: cep.logradouro,
          city: cep.localidade
        }
      )
    }
  }

}
