import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Api/axios";

const initialState = {
  smsUser: [],
  loading: false,
  status: false,
};

export const UserSmsFetching = createAsyncThunk(
  "UserSms/UserSmsFetching",
  async () => {
    const res = await axiosInstance.get("/app/get-smshistory");
    return res.data;
  }
);

export const UserSmsSlice = createSlice({
  name: "UserSms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(UserSmsFetching.pending, (state) => {
      state.status = true;
      state.loading = true;
    });
    builder.addCase(UserSmsFetching.fulfilled, (state, action) => {
      state.status = false;
      state.smsUser = action.payload;
      state.loading = false;
    });
    builder.addCase(UserSmsFetching.rejected, (state) => {
      state.status = false;
      state.loading = false;
    });
  },
});

export default UserSmsSlice.reducer;
