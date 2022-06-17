import { fetchStatus } from "./fetchStatus"

export type productType = {
    id: string
    name: string
    stockQuantity: number
    min: number
    max: number
    price: number
    active: boolean
}

export type productInDocumentType = {
    id: string
    name: string
    quantity: number
    price: number
}

export type selectedProductToPurchaseType = {
    id: string
    name: string
    stockQuantity: number
    selectedQuantity: number
    min: number
    max: number
    price: number
    active: boolean
}

export type postProductType = {
    name: string
    stockQuantity: number | null
    min: number | null
    max: number | null
    price: number | null
    active: boolean
}

export interface IProviderState {
    products: productType[]
    status: fetchStatus
    error: string | null
}
