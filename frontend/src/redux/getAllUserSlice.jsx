import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Api/axios";

const initialState = {
  items: [],
  status: null,
  loading: false,
};

export const allUserFetching = createAsyncThunk(
  "users/allUserFetching",
  async () => {
    const res = await axiosInstance.get("/admin/getalluser");
    return res.data;
  }
);

export const allUserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(allUserFetching.pending, (state) => {
      state.status = "loading...";
      state.loading = true;
    });
    builder.addCase(allUserFetching.fulfilled, (state, action) => {
      state.status = "";
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(allUserFetching.rejected, (state) => {
      state.status = "Something Went Wrong";
    });
  },
});

export default allUserSlice.reducer;
