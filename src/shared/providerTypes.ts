import { fetchStatus } from "./fetchStatus"

export type providerType = {
    id: number | string
    name: string
    phone: number | string
    address: string
    active: boolean
    email: string
}

export type postProviderType = {
    name: string
    phone: number | string
    address: string
    active: boolean
    email: string
}

export interface IProviderState {
    providers: providerType[]
    status: fetchStatus
    error: string | null
}
