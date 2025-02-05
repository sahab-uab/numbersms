import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  adminBalances: [], // Renamed for consistency
  status: null,
  error: null,
};

export const adminBalanceFetching = createAsyncThunk(
  "admin/adminBalanceFetching",
  async () => {
    try {
      const res = await axios.get(`https://server.sms.numbersms.com/api/me`);
      return res.data;
    } catch (error) {
      // Handling the error gracefully
      throw Error(error.response ? error.response.data.message : error.message);
    }
  }
);

export const AdminBalanceSlice = createSlice({
  name: "adminBalance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminBalanceFetching.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(adminBalanceFetching.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.adminBalances = action.payload; // Updated to match new state naming
      })
      .addCase(adminBalanceFetching.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default AdminBalanceSlice.reducer;
