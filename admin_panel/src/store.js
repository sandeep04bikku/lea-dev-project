import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import dashboardSlice from "./slices/dashboardSlice";
import categorySlice from "./slices/categorySlice";
import courseSlice from "./slices/courseSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    dashboard: dashboardSlice,
    category: categorySlice,
    course: courseSlice,
  },
});
