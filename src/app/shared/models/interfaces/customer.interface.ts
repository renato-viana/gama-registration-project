export interface CustomerRequest {
    fullName: string,
    cpf: string,
    cep: string
    street: string,
    number: number,
    city: string,
    state: string,
}

export interface CustomerResponse {
    id: number,
    fullName: string,
    cpf: string,
    cep: string
    street: string,
    number: number,
    city: string,
    state: string,
}