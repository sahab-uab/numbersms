import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Api/axios";

const initialState = {
  items: [],
  status: null,
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
    });
    builder.addCase(allUserFetching.fulfilled, (state, action) => {
      state.status = "";
      state.items = action.payload;
    });
    builder.addCase(allUserFetching.rejected, (state) => {
      state.status = "Something Went Wrong";
    });
  },
});

export default allUserSlice.reducer;
