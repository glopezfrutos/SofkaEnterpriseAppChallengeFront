import { createSlice } from "@reduxjs/toolkit";
import { productToPostType } from "../shared/purchaseOrderTypes";
import { RootState } from "./store";


const initialState: productToPostType[] = []

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
            state.forEach((p) => {
                if (p.name == action.payload.name) {
                    state.splice(0, 1, {
                        name: p.name,
                        quantity: action.payload.quantity,
                        stockQuantity: p.stockQuantity,
                        price: p.price
                    })
                }
            })
        }
    }
})

// actions
export const { addSelectedProduct, removeSelectedProduct, updateSelectedProduct } = selectedProductsSlice.actions;

// state selectors
export const selectSelectedProductsState = () => (state: RootState) => state.selectedProducts