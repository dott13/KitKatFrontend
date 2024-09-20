import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  user: { id: string; email: string } | null;
  token: string | null; // Add token property
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
//Initial state for the slice for future all null so it reinitialize when called
const initialState: UserState = {
  user: null,
  token: null, // Initialize token
  status: "idle",
  error: null,
};

// Define the async thunks with correct return and reject types
//Login Thunk
export const loginUser = createAsyncThunk<
  { message: string }, // Return type including token
  { email: string; password: string }, // Argument type
  { rejectValue: string } // Reject type
>("user/loginUser", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post("/api/login", credentials);
    const { message} = response.data;
    return { message };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Login Failed"
    );
  }
});

export const loginOTPUser = createAsyncThunk<
    { user: { id: string; email: string }; token: string }, // Return type including token
    { email: string; verificationCode: string }, // Argument type
    { rejectValue: string } // Reject type
>("user/loginOTPUser", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post("/api/login-otp", credentials);
    const { user, token } = response.data; // Extract user and token
    return { user, token }; // Return both user data and token
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
        error.response?.data?.message || "LoginOTP Failed"
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
    const response = await axios.post("/api/register", userInfo);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Registration failed"
    );
  }
});

export const resetPasswordUser = createAsyncThunk<
    {message:string},// Return type
    {email:string},// Argument type
    {rejectValue: string } // Reject type
>("user/reset-password", async (userInfo,  thunkAPI) =>{
  try {
    const response = await axios.post("/user/reset-password", userInfo);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Reset Password failed"
    );
  }
})

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
//login---------------------------------------------------------------------------------------------------------
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            message:string
          }>
        ) => {
          state.status = "succeeded";
          state.token = action.payload.message;
          state.error = null;
         })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string; // Ensure correct type
      })
//login-otp---------------------------------------------------------------------------------------------------------
      .addCase(loginOTPUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginOTPUser.fulfilled,
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

          localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginOTPUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string; // Ensure correct type
      })

//register---------------------------------------------------------------------------------------------------------
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled,
        (state, action: PayloadAction<{ id: string; email: string }>) => {
          state.status = "succeeded";
          state.user = action.payload;
          state.error = null;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string; // Ensure correct type
      })
//reset---------------------------------------------------------------------------------------------------------
        .addCase(resetPasswordUser.fulfilled,
        (state) => {
          state.status = "succeeded";
          state.error = null;
        }
      )
      .addCase(resetPasswordUser.rejected,
        (state, action) => {
          state.status="failed";
          state.error=action.payload as string;
        })
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
