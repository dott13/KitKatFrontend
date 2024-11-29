import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../userSlice/userSlice";
import statsSlice from "../statistic/statsSlice.tsx";
export const store = configureStore({
  reducer: {
    user: userSlice,
    stats: statsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
