import { createSlice } from "@reduxjs/toolkit";

const userInfoReducer = createSlice({
  name: "userInfo",
  initialState: {
    value: null,
  },
  reducers: {
    dataFetched: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { dataFetched } = userInfoReducer.actions;
export default userInfoReducer.reducer;
