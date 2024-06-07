import { createSlice } from "@reduxjs/toolkit";

const initState = {
  category: "ALL",
};

const assetsSlice = createSlice({
  name: "assets",
  initialState: initState,
  reducers: {
    changeCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const assetsActions = assetsSlice.actions;
export default assetsSlice.reducer;
