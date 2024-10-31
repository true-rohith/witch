import { createSlice } from "@reduxjs/toolkit";

export const isCartOpen = createSlice({
  name: "isOpen",
  initialState: {
    value: false,
    updated: false,
  },

  reducers: {
    cartClicked: (state) => {
      state.value = !state.value;
    },
    cartUpdated: (state) => {
      state.updated = !state.updated;
    },
  },
});

export const { cartClicked, cartUpdated } = isCartOpen.actions;
export default isCartOpen.reducer;
