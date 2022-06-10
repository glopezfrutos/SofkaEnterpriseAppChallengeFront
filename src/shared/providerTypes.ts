export type providerType = {
    id: number | string
    name: string
    phone: number | string
    address: string
    active: boolean
    email: string
}

export enum fetchStatus {
    IDLE = 'idle',
    COMPLETED = 'completed',
    FAILED = 'failed',
    PENDING = 'pending',
}

export interface IProviderState {
    providers: providerType[]
    status: fetchStatus
    error: string | null
}
