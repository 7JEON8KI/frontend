import { createSlice } from "@reduxjs/toolkit";

export interface LoginState {
  isLoggedIn: boolean;
}

export const initialState: LoginState = {
  // isLoggedIn: localStorage.getItem("Authorization") ? true : false,
  isLoggedIn: false,
};

export const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: state => {
      state.isLoggedIn = true;
    },
    logout: state => {
      state.isLoggedIn = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
