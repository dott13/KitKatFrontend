import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface StatsState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  count: number | null;
}
const initialState: StatsState = {
  status: "idle",
  error: null,
  count: null,
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export const getUsersOnBenchCount = createAsyncThunk<
  number, // The type returned, a number (user count)
  void, // No arguments are required for this thunk
  { rejectValue: string } // The type for rejected errors
>("user/getUsersOnBenchCount", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get("/manager/without-project");
    return response.data.count; // Expecting the count in the response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch bench count"
    );
  }
});

//We have reducers for every state of the slice loading rejected or approved so the data is flowing correctly
const statsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    //getUsersOnBenchCount---------------------------------------------------------------------------------------------------------
    builder
      .addCase(getUsersOnBenchCount.pending, (state) => {
        state.status = "loading"; // Optionally handle loading state
      })
      .addCase(getUsersOnBenchCount.fulfilled, (state, action: PayloadAction<number>) => {
          state.status = "succeeded";
          state.count = action.payload; // Store the bench count
        }
      )
      .addCase(getUsersOnBenchCount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string; // Ensure correct type
      });
  },
});

export default statsSlice.reducer;
