export interface CompanyRequest {
    sender: string,
    cnpj: string,
    cep: string
    street: string,
    number: number,
    city: string,
    state: string,
    deliveryFee: number
}

export interface CompanyResponse {
    id: number
    sender: string,
    cnpj: string,
    cep: string
    street: string,
    number: number,
    city: string,
    state: string,
    deliveryFee: number
}