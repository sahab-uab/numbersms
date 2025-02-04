import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Api/axios";

const initialState = {
  items: [],
  status: null,
};

export const UserSmsFetching = createAsyncThunk(
  "UserSms/UserSmsFetching",
  async () => {
    const res = await axiosInstance.get("/admin/getalluser");
    return res.data;
  }
);

export const UserSmsSlice = createSlice({
  name: "UserSms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(UserSmsFetching.pending, (state) => {
      state.status = "loading...";
    });
    builder.addCase(UserSmsFetching.fulfilled, (state, action) => {
      state.status = "";
      state.items = action.payload;
    });
    builder.addCase(UserSmsFetching.rejected, (state) => {
      state.status = "Something Went Wrong";
    });
  },
});

export default UserSmsSlice.reducer;
