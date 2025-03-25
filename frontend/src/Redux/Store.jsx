import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice";
import dataReducer  from  "./dataSlice"
export const store = configureStore({
    reducer: {
      form: formReducer,
      data:dataReducer
    },
  });