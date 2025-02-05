import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Api/axios";

const initialState = {
  adminblance: [],
  status: null,
  error: null,
};

export const AdminBlanceFetch = createAsyncThunk(
  "smsusages/AdminMessageUsagesFetch",
  async () => {
    try {
      const res = await axiosInstance.post("https://server.sms.numbersms.com/api/me");
      return res.data; // Ensure that we only return the data
    } catch (error) {
      throw Error("Something went wrong while fetching transactions" + error);
    }
  }
);

export const AdminBlanceSlice = createSlice({
  name: "adminblance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AdminBlanceFetch.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(AdminBlanceFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.adminblance = action.payload; // Make sure to assign to transations
      })
      .addCase(AdminBlanceFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Access error message for better debugging
      });
  },
});

export default AdminBlanceSlice.reducer;
