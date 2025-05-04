import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {
    uid: '',
    name: '',
    email: '',
    contactno: '',
    address: '',
    gender: '',
    dob: '',
    role:'',  
    password: '',
  },
  logstate: {   // Should be part of the state
    login: false,  // To store login status
  }

};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;  // Set user info
      state.logstate.login = true;        // Update login status
    },
    logout: (state) => {
      state.userInfo = {};  // Clear user info
      state.logstate.login = false;  // Update login status
      
    },
   
  },
});

export const { login, logout} = userSlice.actions;

export default userSlice.reducer;
