import { fetchStatus } from "./fetchStatus"
import { productInDocumentType } from "./productTypes"


export type purchaseOrderType = {
    id: string
    orderNumber: number | null
    date: string
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
