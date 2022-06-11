import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'
import loginSlice from './loginSlice'
import { providerSlice } from "./providerSlice";
import { productSlice } from "./productSlice";
import { purchaseOrderSlice } from "./buySlice";
import {selectedProductsSlice} from "./selectedProductsSlice";

export const store = configureStore({
  reducer: {
    logged: loginSlice,
    providers: providerSlice.reducer,
    products: productSlice.reducer,
    purchaseOrders: purchaseOrderSlice.reducer,
    selectedProducts: selectedProductsSlice.reducer
  }
})

export type stateType = {
  logged: boolean
}

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()