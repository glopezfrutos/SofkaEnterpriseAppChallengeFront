import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'
import loginSlice from './loginSlice'
import { providerSlice } from "./providerSlice";
import { productSlice } from "./productSlice";
import { purchaseOrderSlice } from "./buySlice";
import {selectedProductsSlice} from "./selectedProductsSlice";

const store = configureStore({
  reducer: {
    logged: loginSlice,
    providers: providerSlice.reducer,
    products: productSlice.reducer,
    purchaseOrders: purchaseOrderSlice.reducer,
    selectedProducts: selectedProductsSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export default store
type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()