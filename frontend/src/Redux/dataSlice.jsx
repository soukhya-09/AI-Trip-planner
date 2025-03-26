import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: JSON.parse(localStorage.getItem("tripData")) || {}, // Load from localStorage
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      localStorage.setItem("tripData", JSON.stringify(action.payload)); // Save to localStorage
    },
  },
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;
