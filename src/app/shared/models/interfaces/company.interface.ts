export interface CompanyRequest {
    name: string,
    cnpj: string,
    email: string,
    cep: string
    endereco: string,
    city: string,
    country: string,
    price: number
}

export interface CompanyResponse {
    id: number
    name: string,
    cnpj: string,
    email: string,
    cep: string
    endereco: string,
    city: string,
    country: string,
    price: number
}