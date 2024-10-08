/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api  from "@/api/api"
import { SubTask } from "@/types/auth";
import { API_ENDPOINTS } from "@/types/api";

// Define the state interface
interface SubTaskState {
  subTasks: SubTask[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: SubTaskState = {
  subTasks: [],
  loading: false,
  error: null,
};

// Async Thunks for API calls

// Fetch all sub-tasks for a task
export const fetchSubTasksByTask = createAsyncThunk<
  SubTask[],
  string, // taskId
  { rejectValue: string }
>("subTasks/fetchByTask", async (taskId, { rejectWithValue }) => {
  try {
    const response = await api.get(`${API_ENDPOINTS.SUBTASK_GET_ALL.replace(":id", taskId)}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch sub-tasks");
  }
});

// Create a new sub-task
export const createSubTask = createAsyncThunk<
  SubTask,
  { taskId: string; subTaskData: Partial<SubTask> }, // taskId and sub-task data
  { rejectValue: string }
>("subTasks/create", async ({ taskId, subTaskData }, { rejectWithValue }) => {
  try {
    const response = await api.post(`${API_ENDPOINTS.SUBTASK_CREATE.replace(":id", taskId)}`, subTaskData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to create sub-task");
  }
});

// Update a sub-task
export const updateSubTask = createAsyncThunk<
  SubTask,
  { subTaskId: string; subTaskData: Partial<SubTask> }, // subTaskId and sub-task data
  { rejectValue: string }
>("subTasks/update", async ({ subTaskId, subTaskData }, { rejectWithValue }) => {
  try {
    const response = await api.put(`${API_ENDPOINTS.SUBTASK_UPDATE.replace(":id", subTaskId)}`, subTaskData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to update sub-task");
  }
});

// Delete a sub-task
export const deleteSubTask = createAsyncThunk<
  { message: string },
  string, // subTaskId
  { rejectValue: string }
>("subTasks/delete", async (subTaskId, { rejectWithValue }) => {
  try {
    const response = await api.delete(`${API_ENDPOINTS.SUBTASK_DELETE.replace(":id", subTaskId)}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete sub-task");
  }
});

// Sub-task slice
const subTaskSlice = createSlice({
  name: "subTasks",
  initialState,
  reducers: {
    // Add any synchronous reducers if needed
  },
  extraReducers: (builder) => {
    // Fetch sub-tasks
    builder
      .addCase(fetchSubTasksByTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubTasksByTask.fulfilled, (state, action) => {
        state.subTasks = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSubTasksByTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch sub-tasks";
      });

    // Create sub-task
    builder
      .addCase(createSubTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubTask.fulfilled, (state, action) => {
        state.subTasks.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(createSubTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create sub-task";
      });

    // Update sub-task
    builder
      .addCase(updateSubTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubTask.fulfilled, (state, action) => {
        const index = state.subTasks.findIndex((task: { id: any; }) => task.id === action.payload.id);
        if (index !== -1) {
          state.subTasks[index] = action.payload;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateSubTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update sub-task";
      });

    // Delete sub-task
    builder
      .addCase(deleteSubTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubTask.fulfilled, (state, action) => {
        state.subTasks = state.subTasks.filter((task: { id: string; }) => task.id !== action.meta.arg);
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteSubTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete sub-task";
      });
  },
});

// Export the reducer and actions
export default subTaskSlice.reducer;
