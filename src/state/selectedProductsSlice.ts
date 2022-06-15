import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productInDocumentType, productToSelectType } from "../shared/purchaseOrderTypes";
import { RootState } from "./store";


const initialState: productInDocumentType[] = []

export const selectedProductsSlice = createSlice({
    name: 'selectedProducts',
    initialState,
    reducers: {
        addSelectedProduct(state, action) {
            state.push(action.payload)
        },
        removeSelectedProduct(state, action: PayloadAction<productInDocumentType>) {
            state.forEach((product) => {
                if (product.name === action.payload.name) {
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