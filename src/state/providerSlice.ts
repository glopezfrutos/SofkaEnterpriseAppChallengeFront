import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProviderState, providerType, postProviderType } from "../shared/providerTypes"
import { fetchStatus } from "../shared/fetchStatus";
import { RootState } from './store'
import { URL } from "../shared/global"


const initialState: IProviderState = {
    providers: [],
    status: fetchStatus.IDLE,
    error: null
}

const ENDPOINT = URL + "api/v1/provider"

export const getAllProviders = createAsyncThunk('providers/fetchAll', async () => {
    const response = await fetch(ENDPOINT, {
        method: 'GET'
    })
    return (await response.json()) as providerType[]
})

export const postProvider = createAsyncThunk('provider/create', async (provider: postProviderType) => {
    const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(provider),
    })
    return (await response.json()) as providerType
})


export const providerSlice = createSlice({
    name: "providers",
    initialState,
    reducers: {
        addProvider: (state, action) => { }
    },
    extraReducers: (builder) => {
        // get
        builder.addCase(getAllProviders.pending, (state, action) => {
            state.status = fetchStatus.PENDING
        })
        builder.addCase(getAllProviders.fulfilled, (state, action) => {
            state.status = fetchStatus.COMPLETED
            state.providers = action.payload
        })
        builder.addCase(getAllProviders.rejected, (state, action) => {
            state.status = fetchStatus.FAILED
            state.error = 'Something went wrong while fetching'
            state.providers = [...state.providers]
        })
        // post
        builder.addCase(postProvider.pending, (state) => {
            state.status = fetchStatus.PENDING
        })
        builder.addCase(postProvider.fulfilled, (state, action) => {
            state.status = fetchStatus.COMPLETED
            state.providers.push(action.payload)
        })
        builder.addCase(postProvider.rejected, (state) => {
            state.status = fetchStatus.FAILED
            state.error = 'Something went wrong while creating the post'
        })
    }
});

// actions
export const { addProvider } = providerSlice.actions;

// state selectors
export const selectProviderState = () => (state: RootState) => state.providers.providers
export const selectProviderStatus = () => (state: RootState) => state.providers.status
export const selectProviderFetchError = () => (state: RootState) => state.providers.error