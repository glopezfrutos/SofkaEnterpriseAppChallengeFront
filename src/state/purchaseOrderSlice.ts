import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchStatus } from "../shared/fetchStatus";
import { RootState } from './store'
import { IPurchaseOrderState, postPurchaseOrderType, purchaseOrderType } from "../shared/purchaseOrderTypes";
import { URL } from "../shared/global"


const initialState: IPurchaseOrderState = {
    purchaseOrders: [],
    status: fetchStatus.IDLE,
    error: null
}

const ENDPOINT = URL + "api/v1/order"

export const getAllPurchaseOrders = createAsyncThunk('order/fetchAll', async () => {
    const response = await fetch(ENDPOINT, {
        method: 'GET'
    })
    return (await response.json()) as purchaseOrderType[]
})

export const postPurchaseOrder = createAsyncThunk('purchaseOrder/create', async (order: postPurchaseOrderType) => {
    console.log(order)
    const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(order),
    })
    return (await response.json()) as purchaseOrderType
})


export const purchaseOrderSlice = createSlice({
    name: "purchaseOrders",
    initialState,
    reducers: {
        addPurchaseOrder: (state, action) => { }
    },
    extraReducers: (builder) => {
        // get
        builder.addCase(getAllPurchaseOrders.pending, (state, action) => {
            state.status = fetchStatus.PENDING
        })
        builder.addCase(getAllPurchaseOrders.fulfilled, (state, action) => {
            state.status = fetchStatus.COMPLETED
            state.purchaseOrders = action.payload
        })
        builder.addCase(getAllPurchaseOrders.rejected, (state, action) => {
            state.status = fetchStatus.FAILED
            state.error = 'Something went wrong while fetching'
            state.purchaseOrders = [...state.purchaseOrders]
        })
        // post
        builder.addCase(postPurchaseOrder.pending, (state) => {
            state.status = fetchStatus.PENDING
        })
        builder.addCase(postPurchaseOrder.fulfilled, (state, action) => {
            state.status = fetchStatus.COMPLETED
            state.purchaseOrders.push(action.payload)
        })
        builder.addCase(postPurchaseOrder.rejected, (state) => {
            state.status = fetchStatus.FAILED
            state.error = 'Something went wrong while creating the post'
        })
    }
});

// actions
export const { addPurchaseOrder } = purchaseOrderSlice.actions;

// state selectors
export const selectPurchaseOrderState = () => (state: RootState) => state.purchaseOrders.purchaseOrders
export const selectPurchaseOrderStatus = () => (state: RootState) => state.purchaseOrders.status
export const selectPurchaseOrderFetchError = () => (state: RootState) => state.purchaseOrders.error