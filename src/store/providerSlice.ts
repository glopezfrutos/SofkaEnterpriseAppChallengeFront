import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProviderState, providerType, fetchStatus } from "../shared/providerTypes"
import { RootState } from './store'


const initialState: IProviderState = {
    providers: [
        {
            id: "1",
            name: "Aname",
            phone: "Aphone",
            address: "Aaddress",
            active: true,
            email: "Aemail"
        },
        {
            id: "2",
            name: "Bname",
            phone: "Bphone",
            address: "Baddress",
            active: true,
            email: "Bemail"
        }
    ],
    status: fetchStatus.IDLE,
    error: null
}

const ENDPOINT = 'http://localhost:8080/api/v1/provider'

export const getAllProviders = createAsyncThunk('providers/fetchAll', async () => {
    const response = await fetch(ENDPOINT, {
        method: 'GET'
    })
    return (await response.json()) as providerType[]
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
      })}
});

// actions
export const { addProvider } = providerSlice.actions;

// state selectors
export const selectProviderState = () => (state: RootState) => state.providers.providers
export const selectProviderStatus = () => (state: RootState) => state.providers.status
export const selectProviderFetchError = () => (state: RootState) => state.providers.error