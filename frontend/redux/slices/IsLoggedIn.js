import { createSlice } from "@reduxjs/toolkit";

export const IsLoggedIn = createSlice({
  name: "IsLoggedIn",
  initialState: {
    value: false,
  },
  reducers: {
    loggedIn: (state) => {
      state.value = true;
    },
    loggedOut: (state) => {
      state.value = false;
    },
  },
});

export const { loggedIn, loggedOut } = IsLoggedIn.actions;
export default IsLoggedIn.reducer;
