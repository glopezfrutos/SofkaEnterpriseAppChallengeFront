import { createSlice } from '@reduxjs/toolkit';

const initialState:boolean = false

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers:{
    toggleLogged(state){
      return !state
    }
  }
})

export const {toggleLogged} = loginSlice.actions
export default loginSlice.reducer