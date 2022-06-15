import { fetchStatus } from "./fetchStatus"

export type productInDocumentType = {
    name: string
    quantity: number
    price: number
}

export type productToSelectType = {
    selected: boolean
    name: string
    quantity: number
    price: number
}

export type purchaseOrderType = {
    id: string
    orderNumber: number | null
    date: Date
    providerId: number
    providerName: number
    products: productInDocumentType[]
}

export type postPurchaseOrderType = {
    providerName: string
    providerId: string
    products: productInDocumentType[]
}

export interface IPurchaseOrderState {
    purchaseOrders: purchaseOrderType[]
    status: fetchStatus
    error: string | null
}
