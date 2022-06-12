import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null
}

const loginSlice = createSlice({
  name: 'logged',
  initialState,
  reducers:{
    logInInReducer(state, action){
      const stateLoggedIn = {...state, user: action.payload}
      return stateLoggedIn
    },
    logOutInReducer(){
      return {user: null}
    }
  }
}
)


export default loginSlice.reducer

export const {logInInReducer, logOutInReducer} = loginSlice.actions