import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

// ✅ Async Thunk for Fetching Transactions
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (page, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth; // Get token from Redux store
      const response = await axiosInstance.get(`/admin/transaction`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response?.data) {
        return {
          transactions: response.data || [],
        };
      } else {
        return rejectWithValue("Invalid API response format");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch transactions!"
      );
    }
  }
);

// ✅ Transactions Slice
const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {}, // No manual reducers needed

  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;
