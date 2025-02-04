import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Api/axios";

const initialState = {
  transations: [],
  status: null,
  error: null,
};

export const allTransationsFetching = createAsyncThunk(
  "transations/allTransationsFetching",
  async () => {
    try {
      const res = await axiosInstance.get("/admin/transaction");
      return res.data; // Ensure that we only return the data
    } catch (error) {
      throw Error("Something went wrong while fetching transactions");
    }
  }
);

export const alltransationsSlice = createSlice({
  name: "transations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allTransationsFetching.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(allTransationsFetching.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transations = action.payload; // Make sure to assign to transations
      })
      .addCase(allTransationsFetching.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Access error message for better debugging
      });
  },
});

export default alltransationsSlice.reducer;
