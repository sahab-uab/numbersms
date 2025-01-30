import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  email: "", // Store email temporarily for OTP verification
  otpVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    registerSuccess: (state, action) => {
      state.email = action.payload.email;
    },
    otpVerifySuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.otpVerified = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.otpVerified = false;
      state.email = "";
    },
  },
});

export const { loginSuccess, registerSuccess, otpVerifySuccess, logout } =
  authSlice.actions;
export default authSlice.reducer;
