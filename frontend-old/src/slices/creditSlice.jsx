import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

// Fetch Transactions
export const fetchTransactions = createAsyncThunk(
  "credit/fetchTransactions",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      if (!auth.token) return rejectWithValue("Authentication required.");

      const response = await axiosInstance.get("/app/transaction", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data.data || []; // Ensure transactions is always an array
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch transactions."
      );
    }
  }
);

// Buy Credit
export const buyCredit = createAsyncThunk(
  "credit/buyCredit",
  async ({ amount, getway, status }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      if (!auth.token) return rejectWithValue("Authentication required.");

      const response = await axiosInstance.post(
        "/app/addblance",
        { amount, getway, status },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        return {
          message: response.data.message,
          transaction: {
            id: new Date().getTime(), // Temporary ID for UI updates
            name: auth.user?.name || "Unknown User",
            amount,
            date: new Date().toLocaleDateString(),
          },
        };
      } else {
        return rejectWithValue(response.data.message || "Transaction failed.");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  }
);

const creditSlice = createSlice({
  name: "credit",
  initialState: {
    transactions: [],
    loading: false,
    error: null,
    successMessage: "",
  },
  reducers: {
    clearMessages: (state) => {
      state.successMessage = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Buy Credit
      .addCase(buyCredit.pending, (state) => {
        state.error = null;
        state.successMessage = "";
      })
      .addCase(buyCredit.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
        state.transactions.unshift(action.payload.transaction);
      })
      .addCase(buyCredit.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = creditSlice.actions;
export default creditSlice.reducer;
