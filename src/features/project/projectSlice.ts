/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk,  } from "@reduxjs/toolkit";
import api from "@/api/api";
import { Project } from "@/types/auth"; // Import your Project type
import { API_ENDPOINTS } from "@/types/api";

// Define the state interface
interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null | undefined;
}

// Initial state
const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};

// Async Thunks for API calls

// Fetch all projects
export const fetchProjects = createAsyncThunk<
  Project[],
  void,
  { rejectValue: string | null }
>("projects/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(API_ENDPOINTS.PROJECT_GET_ALL);
    return response.data; // Assuming response.data contains the project array
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch projects"
    );
  }
});

// Create a new project
export const createProject = createAsyncThunk<
  Project,
  Partial<Project>,
  { rejectValue: string | null }
>("projects/create", async (projectData, { rejectWithValue }) => {
  try {
    const response = await api.post(API_ENDPOINTS.PROJECT_CREATE, projectData);
    return response.data; // Assuming response.data contains the created project
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to create project"
    );
  }
});

// Update a project
export const updateProject = createAsyncThunk<
  Project,
  { projectId: string; projectData: Partial<Project> },
  { rejectValue: string | null }
>(
  "projects/update",
  async ({ projectId, projectData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        API_ENDPOINTS.PROJECT_UPDATE.replace(":id", projectId),
        projectData
      );
      return response.data; // Assuming response.data contains the updated project
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update project"
      );
    }
  }
);

// Delete a project
export const deleteProject = createAsyncThunk<
  { message: string },
  string,
  { rejectValue: string | null }
>("projects/delete", async (projectId, { rejectWithValue }) => {
  try {
    const response = await api.delete(
      API_ENDPOINTS.PROJECT_DELETE.replace(":id", projectId)
    );
    return response.data; // Assuming response.data contains a message
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to delete project"
    );
  }
});

// Get project by ID
export const getProjectById = createAsyncThunk<
  Project,
  { projectId: string },
  { rejectValue: string | null }
>("projects/getById", async ({ projectId }, { rejectWithValue }) => {
  try {
    const response = await api.get(
      API_ENDPOINTS.PROJECT_GET.replace(":id", projectId)
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to load project details"
    );
  }
});

// Project slice
const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null; // Reset error state
    },
    resetCurrentProject(state) {
      state.currentProject = null; // Clear current project
    },
  },
  extraReducers: (builder) => {
    // Fetch projects
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.loading = false;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create project
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
        state.loading = false;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update project
    builder
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(
          (project) => project.id === action.payload.id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete project
    builder
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (project) => project.id !== action.meta.arg
        );
        state.loading = false;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get project by ID
    builder
      .addCase(getProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
        state.currentProject = action.payload;
        state.loading = false;
      })
      .addCase(getProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer and actions
export const { resetError, resetCurrentProject } = projectSlice.actions;
export default projectSlice.reducer;
