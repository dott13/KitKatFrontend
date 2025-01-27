import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// Define the structure for a worker in the project
interface ProjectWorker {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
  position: { positionId: number; name: string } | null;
  seniority: { seniorityId: number; name: string } | null;
  city: {
    cityId: number;
    cityName: string;
    country: { countryId: number; countryName: string };
  } | null;
  languages: { languageId: number; languageName: string }[];
  role: { roleId: number; name: string };
  status: { statusId: number; name: string };
}

// Define the structure for the project
interface Project {
  projectId: number;
  projectName: string;
  startDate: string; // "YYYY-MM-DDTHH:mm:ss"
  finishDate: string | null; // Can be null
  status: boolean;
  description: string;
  manager: {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string | null;
    position: { positionId: number; name: string } | null;
    seniority: { seniorityId: number; name: string } | null;
    city: {
      cityId: number;
      cityName: string;
      country: { countryId: number; countryName: string };
    } | null;
    languages: { languageId: number; languageName: string }[];
    role: { roleId: number; name: string };
    status: { statusId: number; name: string };
  };
  workers: ProjectWorker[];
}

// Define the Redux state
interface ProjectState {
  project: Project | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: ProjectState = {
  project: null,
  status: "idle",
  error: null,
};

// Fetch the project assigned to a user
export const getProjectById = createAsyncThunk<
  Project,
  number,
  { rejectValue: string }
>("project/getProjectById", async (userId, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get(
      `/manager/worker/project/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Assuming response contains project details
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch user's project"
    );
  }
});

// Create the Redux slice
const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjectById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getProjectById.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.status = "succeeded";
          state.project = action.payload;
        }
      )
      .addCase(getProjectById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default projectSlice.reducer;
