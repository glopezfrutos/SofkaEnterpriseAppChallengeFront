import { configureStore } from "@reduxjs/toolkit";
import loginSlice from './loginSlice'


export const store = configureStore({
  reducer: {
    logged: loginSlice
  }
})

export type stateType = {
  logged: boolean
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch