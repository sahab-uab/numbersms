// https://server.numbersms.com/api/get-services
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Api/axios";

const initialState = {
  service: [],
  loading: false,
  status: null,
};

export const allServicFetching = createAsyncThunk(
  "users/allUserFetching",
  async () => {
    const res = await axiosInstance.get("/get-services");
    return res.data;
  }
);

export const allServiceSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(allServicFetching.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    });
    builder.addCase(allServicFetching.fulfilled, (state, action) => {
      state.status = "";
      state.service = action.payload;
      state.loading = false;
    });
    builder.addCase(allServicFetching.rejected, (state) => {
      state.status = "Something Went Wrong";
      state.loading = false;
    });
  },
});

export default allServiceSlice.reducer;
