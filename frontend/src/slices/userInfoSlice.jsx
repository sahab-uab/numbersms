import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error("Error fetching profile data:", err);
      return rejectWithValue("Failed to fetch user data. Please try again.");
    }
  }
);

const userInfoSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload; // Store user data in state
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error if the API call fails
      });
  },
});

export default userInfoSlice.reducer;
