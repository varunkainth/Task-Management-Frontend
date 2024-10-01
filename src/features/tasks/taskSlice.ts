/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";
import { API_ENDPOINTS } from "@/types/api";
import { Task,  } from "@/types/auth"; 

// Define the initial state
interface TaskState {
  tasks: Task[];
  task: Task | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: TaskState = {
  tasks: [],
  task: null,
  loading: false,
  error: null,
  message: null,
};

// Async thunk to get all tasks
export const getAllTasks = createAsyncThunk(
  "task/getAllTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(API_ENDPOINTS.TASK_GET_ALL);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch tasks.");
    }
  }
);

// Async thunk to get task details
export const getTaskDetails = createAsyncThunk(
  "task/getTaskDetails",
  async (taskId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.TASK_GET}/${taskId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch task details.");
    }
  }
);

// Async thunk to update task details
export const updateTaskDetails = createAsyncThunk(
  "task/updateTaskDetails",
  async (taskData: Partial<Task>, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_ENDPOINTS.TASK_UPDATE}/${taskData.id}`, taskData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update task.");
    }
  }
);

// Async thunk to delete a task
export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${API_ENDPOINTS.TASK_DELETE}/${taskId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete task.");
    }
  }
);

// Create the slice
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    clearTaskState: (state) => {
      state.task = null;
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
      // Handle getAllTasks
      .addCase(getAllTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle getTaskDetails
      .addCase(getTaskDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTaskDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
      })
      .addCase(getTaskDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle updateTaskDetails
      .addCase(updateTaskDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTaskDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
      })
      .addCase(updateTaskDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle deleteTask
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { clearTaskState, clearError } = taskSlice.actions;
export default taskSlice.reducer;
