/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";
import { API_ENDPOINTS } from "@/types/api";
import { SubTask } from "@/types/auth"; // Assuming Subtask type is defined in your types

// Define the initial state
interface SubtaskState {
  subtasks: SubTask[];
  subtask: SubTask | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: SubtaskState = {
  subtasks: [],
  subtask: null,
  loading: false,
  error: null,
  message: null,
};

// Async thunk to get all subtasks for a specific task
export const getAllSubtasks = createAsyncThunk(
  "subtask/getAllSubtasks",
  async (taskId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.SUBTASK_GET_ALL}/${taskId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch subtasks.");
    }
  }
);

// Async thunk to get details of a specific subtask
export const getSubtaskDetails = createAsyncThunk(
  "subtask/getSubtaskDetails",
  async (subtaskId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.SUBTASK_GET}/${subtaskId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch subtask details.");
    }
  }
);

// Async thunk to create a new subtask
export const createSubtask = createAsyncThunk(
  "subtask/createSubtask",
  async ({ taskId, subtaskData }: { taskId: string; subtaskData: Partial<SubTask> }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_ENDPOINTS.SUBTASK_CREATE}/${taskId}`, subtaskData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create subtask.");
    }
  }
);

// Async thunk to update subtask details
export const updateSubtaskDetails = createAsyncThunk(
  "subtask/updateSubtaskDetails",
  async (subtaskData: Partial<SubTask>, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_ENDPOINTS.SUBTASK_UPDATE}/${subtaskData.id}`, subtaskData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update subtask.");
    }
  }
);

// Async thunk to delete a subtask
export const deleteSubtask = createAsyncThunk(
  "subtask/deleteSubtask",
  async (subtaskId: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${API_ENDPOINTS.SUBTASK_DELETE}/${subtaskId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete subtask.");
    }
  }
);

// Create the slice
const subtaskSlice = createSlice({
  name: "subtask",
  initialState,
  reducers: {
    clearSubtaskState: (state) => {
      state.subtask = null;
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
      // Handle getAllSubtasks
      .addCase(getAllSubtasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSubtasks.fulfilled, (state, action) => {
        state.loading = false;
        state.subtasks = action.payload;
      })
      .addCase(getAllSubtasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle getSubtaskDetails
      .addCase(getSubtaskDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubtaskDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.subtask = action.payload;
      })
      .addCase(getSubtaskDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle createSubtask
      .addCase(createSubtask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubtask.fulfilled, (state, action) => {
        state.loading = false;
        state.subtasks.push(action.payload); // Add the new subtask to the list
      })
      .addCase(createSubtask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle updateSubtaskDetails
      .addCase(updateSubtaskDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubtaskDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.subtask = action.payload; // Update the current subtask details
      })
      .addCase(updateSubtaskDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle deleteSubtask
      .addCase(deleteSubtask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubtask.fulfilled, (state, action) => {
        state.loading = false;
        state.subtasks = state.subtasks.filter((subtask: { id: any; }) => subtask.id !== action.payload.id); // Remove the deleted subtask
      })
      .addCase(deleteSubtask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { clearSubtaskState, clearError } = subtaskSlice.actions;
export default subtaskSlice.reducer;
