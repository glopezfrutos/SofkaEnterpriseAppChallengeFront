import { createSlice } from "@reduxjs/toolkit";
import { productInDocumentType } from "../shared/purchaseOrderTypes";
import { RootState } from "./store";


const initialState: productInDocumentType[] = []

export const selectedProductsSlice = createSlice({
    name: 'selectedProducts',
    initialState,
    reducers: {
        addSelectedProduct(state, action) {
            state.push(action.payload)
        },
        removeSelectedProduct(state, action) {
            state.splice(action.payload, 1)
        },
        updateSelectedProduct(state, action) {
            
            state.forEach((product) => {

                    product.quantity = (action.payload.quantity)
                
            })
        }
    }
})

// actions
export const { addSelectedProduct, removeSelectedProduct, updateSelectedProduct } = selectedProductsSlice.actions;

// state selectors
export const selectSelectedProductsState = () => (state: RootState) => state.selectedProducts