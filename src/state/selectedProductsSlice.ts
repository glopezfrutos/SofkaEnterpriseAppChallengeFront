import { createSlice } from "@reduxjs/toolkit";
import { productToSelectType } from "../shared/purchaseOrderTypes";
import { RootState } from "./store";


const initialState: productToSelectType[] = []

export const selectedProductsSlice = createSlice({
    name: 'selectedProducts',
    initialState,
    reducers: {
        addSelectedProduct(state, action) {
            state.push(action.payload)
        },
        removeSelectedProduct(state, action) {
            state.splice(action.payload, 1)
        }
    }
})

// actions
export const { addSelectedProduct, removeSelectedProduct } = selectedProductsSlice.actions;

// state selectors
export const selectSelectedProductsState = () => (state: RootState) => state.selectedProducts