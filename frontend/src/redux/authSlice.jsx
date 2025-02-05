import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Api/axios";

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  email: "",
  otpVerified: false,
  status: null,
  error: null,
};

// Define the asynchronous action for fetching the refresh token
export const fetchingRefreshToken = createAsyncThunk(
  "refreshToken",
  async () => {
    try {
      const res = await axiosInstance.get("/refresh-token"); // Make sure this is a GET or POST based on your backend
      return res.data.token; // Return the new token
    } catch (error) {
      throw Error("Something went wrong while fetching transactions");
    }
  }
);

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

  extraReducers: (builder) => {
    builder
      .addCase(fetchingRefreshToken.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(fetchingRefreshToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;
      })
      .addCase(fetchingRefreshToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { loginSuccess, registerSuccess, otpVerifySuccess, logout } =
  authSlice.actions;

export default authSlice.reducer;
