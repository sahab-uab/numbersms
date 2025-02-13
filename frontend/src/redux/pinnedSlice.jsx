import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  pinedItems: localStorage.getItem("pinnedServices")
    ? JSON.parse(localStorage.getItem("pinnedServices"))
    : [],
};

const pinedSlice = createSlice({
  name: "pined",
  initialState,
  reducers: {
    addToPin(state, action) {
      const existedItemIndex = state.pinedItems.findIndex(
        (item) => item.id === action.payload.id
      );

      // If item doesn't exist, add to the pinedItems
      if (existedItemIndex === -1) {
        const assembledItem = action.payload;
        state.pinedItems.unshift(assembledItem);

        toast.success("Service pinned into cart!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        localStorage.setItem(
          "pinnedServices",
          JSON.stringify(state.pinedItems)
        );
      } else {
        toast.warning("Service Already Pined", {
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
    },
    removeTopin(state, action) {
      const existedItemIndex = state.pinedItems.findIndex(
        (item) => item.id === action.payload.id
      );

      // If item exist, remove from the pinedItems
      if (existedItemIndex !== -1) {
        state.pinedItems.splice(existedItemIndex, 1);

        toast.error("Service removed from cart!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        localStorage.setItem(
          "pinnedServices",
          JSON.stringify(state.pinedItems)
        );
      }
    },
  },
});

export const { addToPin, removeTopin } = pinedSlice.actions;
export default pinedSlice.reducer;
