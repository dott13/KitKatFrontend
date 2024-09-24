import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  user: { id: string; email: string } | null;
  token: string | null; // Add token property
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  list: UserModel[]| []
}
//Initial state for the slice for future all null so it reinitialized when called
const initialState: UserState = {
  user: null,
  token: null, // Initialize token
  status: "idle",
  error: null,
  list:[]
};

interface UserModel {
  id: number;
  name: string;
  surname: string;
  email: string;
  avatar: Uint8Array;
  seniority: string;
  role: string;
  languages: string[];
  skills: string[];
  city: string;
}

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
    { user: { id: string; email: string }; jwt: string }, // Return type including token
    { email: string; verificationCode: string }, // Argument type
    { rejectValue: string } // Reject type
>("user/loginOTPUser", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post("/api/login-otp", credentials);
    const { user, jwt } = response.data; // Extract user and token
    return { user, jwt }; // Return both user data and token
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
      
export const getAllUser = createAsyncThunk<
  UserModel[] , // Return type
  void,
  { rejectValue: string } // Reject value type
>("user/all", async (_credentials,   thunkAPI) => {
  try {
    const response = await axios.get("/manager/worker");
    const users: UserModel[] = response.data.user; // Extract users from response
    return  users ; // Return user data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Get all workers failed"
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
//login---------------------------------------------------------------------------------------------------------
    builder
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
            jwt: string;
          }>
        ) => {
          state.status = "succeeded";
          state.user = action.payload.user;
          state.token = action.payload.jwt; // Store token
          state.error = null;

          localStorage.setItem("token", action.payload.jwt);
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
// getUser------------------------------------------------------------------------------------------------------
      .addCase(getAllUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload; // Store the user data in state
      })
      .addCase(getAllUser.rejected, (state) => {
        state.status = "failed";
        state.error =  "Something went wrong"; // Handle error
      })
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
