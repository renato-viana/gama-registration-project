export interface CustomerRequest {
    name: string,
    email: string,
    cpf: string,
    cep: string
    endereco: string,
    city: string,
    country: string
}

export interface CustomerResponse {
    id: number,
    name: string,
    email: string,
    cpf: string,
    cep: string
    endereco: string,
    city: string,
    country: string
}