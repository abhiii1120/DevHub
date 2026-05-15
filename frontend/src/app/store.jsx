import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/AuthSlice";
export let store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
