import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productType, selectedProductToPurchaseType } from "../shared/productTypes";
import { RootState } from "./store";


const initialState: selectedProductToPurchaseType[] = []

export const selectedProductsSlice = createSlice({
    name: 'selectedProducts',
    initialState,
    reducers: {
        addSelectedProduct(state, action: PayloadAction<selectedProductToPurchaseType>) {
            state.push(action.payload)
        },
        removeSelectedProduct(state, action: PayloadAction<selectedProductToPurchaseType|productType>) {
            state.forEach((product) => {
                if (product.id === action.payload.id) {
                    state.splice(state.indexOf(product), 1)
                }
            })
        },
        clearSelectedProduct(state, action) {
            state.splice(0)
        }
    }
})

// actions
export const { addSelectedProduct, removeSelectedProduct, clearSelectedProduct } = selectedProductsSlice.actions;

// state selectors
export const selectSelectedProductsState = () => (state: RootState) => state.selectedProducts