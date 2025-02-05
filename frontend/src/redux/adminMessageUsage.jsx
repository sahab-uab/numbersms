import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Api/axios";

const initialState = {
  smsusagesdata: [],
  status: null,
  error: null,
};

export const AdminMessageUsagesFetch = createAsyncThunk(
  "smsusages/AdminMessageUsagesFetch",
  async () => {
    try {
      const res = await axiosInstance.get("/admin/get-smshistory");
      return res.data; // Ensure that we only return the data
    } catch (error) {
      throw Error("Something went wrong while fetching transactions" + error);
    }
  }
);

export const AdminMessageUsagesSlice = createSlice({
  name: "smsusagesdata",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AdminMessageUsagesFetch.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(AdminMessageUsagesFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.smsusagesdata = action.payload; // Make sure to assign to transations
      })
      .addCase(AdminMessageUsagesFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Access error message for better debugging
      });
  },
});

export default AdminMessageUsagesSlice.reducer;
