import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Local Storage
import { combineReducers } from "redux";
import formReducer from "./formSlice";
import dataReducer from "./dataSlice";

// Persist Config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["form", "data"], // Reducers to persist
};

// Combine Reducers
const rootReducer = combineReducers({
  form: formReducer,
  data: dataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
