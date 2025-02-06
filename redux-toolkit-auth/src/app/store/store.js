import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./auth";
import messageReducer from "./message";

const reducer = {
  auth: authReducer,
  message: messageReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});
