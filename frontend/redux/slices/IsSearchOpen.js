import { createSlice } from "@reduxjs/toolkit";

export const IsSearchOpen = createSlice({
  name: "IsSearchOpen",
  initialState: {
    value: false,
  },
  reducers: {
    searchOpen: (state) => {
      state.value = true;
    },
    searchClose: (state) => {
      state.value = false;
    },
  },
});

export const { searchOpen, searchClose } = IsSearchOpen.actions;
export default IsSearchOpen.reducer;
