import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  pinedItems: localStorage.getItem("pinnedServices")
    ? JSON.parse(localStorage.getItem("pinnedServices"))
    : [],
};

const pinedSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToPin(state, action) {
      const existedItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      // if exist
      if (existedItemIndex >= 0) {
        toast.info("Service Already Pined", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        // add to cart
        const assembledItem = { ...action.payload };
        state.cartItems.push(assembledItem);

        toast.success("Service pined into cart!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      localStorage.setItem("pinnedServices", JSON.stringify(state.pinedItems));
    },
  },
});

export const { addToPin } = pinedSlice.actions;
export default pinedSlice.reducer;
