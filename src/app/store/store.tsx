import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import employeeSlice from "../slices/employeeSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    employee: employeeSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
 