import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../userSlice/userSlice";
import statsSlice from "../statistic/statsSlice.tsx";
import projectSlice from "../projectSlice/projectSlice.tsx";
export const store = configureStore({
  reducer: {
    user: userSlice,
    stats: statsSlice,
    project: projectSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
