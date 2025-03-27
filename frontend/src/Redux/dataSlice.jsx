import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: JSON.parse(localStorage.getItem("tripData")) || {}, 
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      localStorage.setItem("tripData", JSON.stringify(action.payload));
    },
  },
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;
