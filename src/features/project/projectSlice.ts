/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";
import { API_ENDPOINTS } from "@/types/api";
import { Project } from "@/types/auth"; // Assuming Project type is defined in your types

// Define the initial state
interface ProjectState {
  projects: Project[];
  project: Project | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: ProjectState = {
  projects: [],
  project: null,
  loading: false,
  error: null,
  message: null,
};

// Async thunk to get all projects
export const getAllProjects = createAsyncThunk(
  "project/getAllProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(API_ENDPOINTS.PROJECT_GET_ALL);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch projects.");
    }
  }
);

// Async thunk to get project details
export const getProjectDetails = createAsyncThunk(
  "project/getProjectDetails",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.PROJECT_GET}/${projectId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch project details.");
    }
  }
);

// Async thunk to create a new project
export const createProject = createAsyncThunk(
  "project/createProject",
  async (projectData: Partial<Project>, { rejectWithValue }) => {
    try {
      const response = await api.post(API_ENDPOINTS.PROJECT_CREATE, projectData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create project.");
    }
  }
);

// Async thunk to update project details
export const updateProjectDetails = createAsyncThunk(
  "project/updateProjectDetails",
  async (projectData: Partial<Project>, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_ENDPOINTS.PROJECT_UPDATE}/${projectData.id}`, projectData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update project.");
    }
  }
);

// Async thunk to delete a project
export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${API_ENDPOINTS.PROJECT_DELETE}/${projectId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete project.");
    }
  }
);

// Create the slice
const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    clearProjectState: (state) => {
      state.project = null;
      state.loading = false;
      state.error = null;
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getAllProjects
      .addCase(getAllProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle getProjectDetails
      .addCase(getProjectDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProjectDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(getProjectDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle createProject
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload); // Add the new project to the list
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle updateProjectDetails
      .addCase(updateProjectDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProjectDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload; // Update the current project details
      })
      .addCase(updateProjectDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle deleteProject
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter((project) => project.id !== action.payload.id); // Remove the deleted project
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { clearProjectState, clearError } = projectSlice.actions;
export default projectSlice.reducer;
