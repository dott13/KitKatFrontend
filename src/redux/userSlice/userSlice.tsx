import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  user: { id: string; email: string } | null;
  token: string | null; // Add token property
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
//Initial state for the slice for future all null so it reinitializez when called
const initialState: UserState = {
  user: null,
  token: null, // Initialize token
  status: "idle",
  error: null,
};

// Define the async thunks with correct return and reject types
//Login Thunk
export const loginUser = createAsyncThunk<
  { user: { id: string; email: string }; token: string }, // Return type including token
  { email: string; password: string }, // Argument type
  { rejectValue: string } // Reject type
>("user/loginUser", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post("/api/login", credentials);
    const { user, token } = response.data; // Extract user and token
    return { user, token }; // Return both user data and token
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Login Failed"
    );
  }
});

//Register Thunk
export const registerUser = createAsyncThunk<
  { id: string; email: string }, // Return type
  { email: string; password: string }, // Argument type
  { rejectValue: string } // Reject type
>("user/registerUser", async (userInfo, thunkAPI) => {
  try {
    const response = await axios.post("/user/register", userInfo);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Registration failed"
    );
  }
});

//Slice for adding to the redux store also name for using in Selectors later
//We have reducers for every state of the slice loading rejected or approved so the data is flowing correctly
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null; // Clear token on logout
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: { id: string; email: string };
            token: string;
          }>
        ) => {
          state.status = "succeeded";
          state.user = action.payload.user;
          state.token = action.payload.token; // Store token
          state.error = null;

          // Optionally, store the token in localStorage
          localStorage.setItem("token", action.payload.token);
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string; // Ensure correct type
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<{ id: string; email: string }>) => {
          state.status = "succeeded";
          state.user = action.payload;
          state.error = null;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string; // Ensure correct type
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
