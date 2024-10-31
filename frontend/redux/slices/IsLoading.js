import { createSlice } from "@reduxjs/toolkit";

export const IsLoading = createSlice({
  name: "IsLoading",
  initialState: {
    value: false,
  },
  reducers: {
    loading: (state) => {
      state.value = true;
    },
    loaded: (state) => {
      state.value = false;
    },
  },
});

export const { loading, loaded } = IsLoading.actions;
export default IsLoading.reducer;
