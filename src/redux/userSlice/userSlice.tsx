import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  user: UserModel | null;
  token: string | null; // Add token property
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  list: UserModel[] | [];
  count: number | null;
}
//Initial state for the slice for future all null so it reinitialized when called
const initialState: UserState = {
  user: null,
  token: null, // Initialize token
  status: "idle",
  error: null,
  list: [],
  count: null,
};

interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: Uint8Array;
  seniority: string;
  role: string;
  languages: string;
  skills: string[];
  city: string;
  position: string | null;
  status: {
    statusId: number;
    name: string;
  } | null;
  managerId: number | null;
  languageIdList: number[];
}

interface UpdateUser{
  userId: number;
  firstName: string | null;
  lastName: string | null;
  avatar: Uint8Array | null;
  position: string | null;
  seniority: string | null;
  city: string | null;
  languages: string | null;
  cv: Uint8Array | null;
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
    const { message } = response.data;
    return { message };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Login Failed"
    );
  }
});

export const loginOTPUser = createAsyncThunk<
  { user: UserModel; jwt: string }, // Return type including token
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

export const getUserByEmail = createAsyncThunk<
  UserModel, // Return type
  string, // Argument type: user email
  { rejectValue: string } // Reject type
>("user/getUserByEmail", async (email, thunkAPI) => {
  try {
    const response = await axios.get(`/user/${email}`);
    return response.data; // Assuming the response is the user object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Get user by email failed"
    );
  }
});

//Register Thunk
export const registerUser = createAsyncThunk<
  UserModel, // Return type
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
  { message: string }, // Return type
  { email: string }, // Argument type
  { rejectValue: string } // Reject type
>("user/reset-password", async (userInfo, thunkAPI) => {
  try {
    const response = await axios.post("/user/reset-password", userInfo);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Reset Password failed"
    );
  }
});

export const getAllUser = createAsyncThunk<
  UserModel[] , // Return type
  void,
  { rejectValue: string } // Reject value type
>("user/all", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/manager/worker");
    return response.data; // Directly return the array of users
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("API Error:", error); // Log any API errors
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Get all workers failed"
    );
  }
});

export const updateUser = createAsyncThunk<
  {message:string},// Return type
  UpdateUser,
  {rejectValue: string } // Reject type
>("user/update", async (userInfo,  thunkAPI) =>{
  try {
    const response = await axios.put("/user/update", userInfo);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Update Password failed"
    );
  }
})


export const getUsersOnBenchCount = createAsyncThunk<
  number, // The type returned, a number (user count)
  void, // No arguments are required for this thunk
  { rejectValue: string } // The type for rejected errors
>("user/getUsersOnBenchCount", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/user/without-project");
    return response.data.count; // Expecting the count in the response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch bench count"
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
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            message: string;
          }>
        ) => {
          state.status = "succeeded";
          state.token = action.payload.message;
          state.error = null;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string; // Ensure correct type
      })
      //login-otp---------------------------------------------------------------------------------------------------------
      .addCase(loginOTPUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        loginOTPUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: UserModel;
            jwt: string;
          }>
        ) => {
          state.status = "succeeded";
          state.user = action.payload.user;
          state.token = action.payload.jwt; // Store token
          state.error = null;

          localStorage.setItem("token", action.payload.jwt);
        }
      )
      .addCase(loginOTPUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string; // Ensure correct type
      })

      //register---------------------------------------------------------------------------------------------------------
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<UserModel>) => {
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
      .addCase(resetPasswordUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(resetPasswordUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
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
        state.error = "Something went wrong"; // Handle error
      })
// updateUser---------------------------------------------------------------------------------------------------
      .addCase(updateUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
      .addCase(updateUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = "failed";
        state.error =  "Something went wrong"; // Handle error
      })

      .addCase(getUserByEmail.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserByEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getUserByEmail.rejected, (state) => {
        state.status = "failed";
        state.error = "Something went wrong";
      })
      .addCase(getUsersOnBenchCount.pending, (state) => {
        state.status = "loading"; // Optionally handle loading state
      })
      .addCase(
        getUsersOnBenchCount.fulfilled,
        (state, action: PayloadAction<number>) => {
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

export const { logout } = userSlice.actions;
export default userSlice.reducer;
