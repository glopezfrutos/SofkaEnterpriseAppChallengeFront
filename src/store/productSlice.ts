import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productType, postProductType, IProviderState } from "../shared/productTypes"
import { fetchStatus } from "../shared/fetchStatus";
import { RootState } from './store'


const initialState: IProviderState = {
    products: [],
    status: fetchStatus.IDLE,
    error: null
}

const ENDPOINT = 'http://localhost:8080/api/v1/product'

export const getAllProducts = createAsyncThunk('product/fetchAll', async () => {
    const response = await fetch(ENDPOINT, {
        method: 'GET'
    })
    return (await response.json()) as productType[]
})

export const postProduct = createAsyncThunk('product/create', async (product: postProductType) => {
    const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(product),
    })
    return (await response.json()) as productType
})


export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct: (state, action) => { }
    },
    extraReducers: (builder) => {
        // get
        builder.addCase(getAllProducts.pending, (state, action) => {
            state.status = fetchStatus.PENDING
        })
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.status = fetchStatus.COMPLETED
            state.products = action.payload
        })
        builder.addCase(getAllProducts.rejected, (state, action) => {
            state.status = fetchStatus.FAILED
            state.error = 'Something went wrong while fetching'
            state.products = [...state.products]
        })
        // post
        builder.addCase(postProduct.pending, (state) => {
            state.status = fetchStatus.PENDING
        })
        builder.addCase(postProduct.fulfilled, (state, action) => {
            state.status = fetchStatus.COMPLETED
            state.products.push(action.payload)
        })
        builder.addCase(postProduct.rejected, (state) => {
            state.status = fetchStatus.FAILED
            state.error = 'Something went wrong while creating the post'
        })
    }
});

// actions
export const { addProduct } = productSlice.actions;

// state selectors
export const selectProductState = () => (state: RootState) => state.products.products
export const selectProductStatus = () => (state: RootState) => state.products.status
export const selectProductFetchError = () => (state: RootState) => state.products.error