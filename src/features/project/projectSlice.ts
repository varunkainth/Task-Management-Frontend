/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";
import { Project } from "@/types/auth"; // Import your Project type
import { API_ENDPOINTS } from "@/types/api";

// Define the state interface
interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

// Async Thunks for API calls

// Fetch all projects
export const fetchProjects = createAsyncThunk<
  Project[],
  void, // No parameters needed for fetching all projects
  { rejectValue: string }
>("projects/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(API_ENDPOINTS.PROJECT_GET_ALL);
    return response.data; // Assuming response.data contains the project array
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch projects");
  }
});

// Create a new project
export const createProject = createAsyncThunk<
  Project,
  Partial<Project>, // Project data
  { rejectValue: string }
>("projects/create", async (projectData, { rejectWithValue }) => {
  try {
    const response = await api.post(API_ENDPOINTS.PROJECT_CREATE, projectData);
    return response.data; // Assuming response.data contains the created project
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to create project");
  }
});

// Update a project
export const updateProject = createAsyncThunk<
  Project,
  { projectId: string; projectData: Partial<Project> }, // projectId and project data
  { rejectValue: string }
>("projects/update", async ({ projectId, projectData }, { rejectWithValue }) => {
  try {
    const response = await api.put(API_ENDPOINTS.PROJECT_UPDATE.replace(":id", projectId), projectData);
    return response.data; // Assuming response.data contains the updated project
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to update project");
  }
});

// Delete a project
export const deleteProject = createAsyncThunk<
  { message: string },
  string, // projectId
  { rejectValue: string }
>("projects/delete", async (projectId, { rejectWithValue }) => {
  try {
    const response = await api.delete(API_ENDPOINTS.PROJECT_DELETE.replace(":id", projectId));
    return response.data; // Assuming response.data contains a message
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete project");
  }
});

// Project slice
const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // Add any synchronous reducers if needed
    resetError(state) {
      state.error = null; // Reset error state
    },
  },
  extraReducers: (builder) => {
    // Fetch projects
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error before fetching
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload; // Set the fetched projects
        state.loading = false;
        state.error = null; // Clear any previous error
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch projects"; // Handle fetch errors
      });

    // Create project
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error before creating
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload); // Add the created project
        state.loading = false;
        state.error = null; // Clear any previous error
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create project"; // Handle create errors
      });

    // Update project
    builder
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error before updating
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex((project) => project.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload; // Update the project
        }
        state.loading = false;
        state.error = null; // Clear any previous error
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update project"; // Handle update errors
      });

    // Delete project
    builder
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error before deleting
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((project) => project.id !== action.meta.arg); // Remove the deleted project
        state.loading = false;
        state.error = null; // Clear any previous error
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete project"; // Handle delete errors
      });
  },
});

// Export the reducer and actions
export const { resetError } = projectSlice.actions;
export default projectSlice.reducer;
