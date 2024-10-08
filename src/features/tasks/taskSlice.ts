/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";
import { API_ENDPOINTS } from "@/types/api";
import { Task } from "@/types/auth"; 
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

// Async thunk to create a new task
export const createTask = createAsyncThunk(
  "task/createTask",
  async (taskData: Partial<Task>, { rejectWithValue }) => {
    try {
      const response = await api.post(API_ENDPOINTS.TASK_CREATE, taskData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create task."
      );
    }
  }
);

// Async thunk to update a task by ID
export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (
    { taskId, taskData }: { taskId: string; taskData: Partial<Task> },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(
        `${API_ENDPOINTS.TASK_UPDATE}/${taskId}`,
        taskData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update task."
      );
    }
  }
);

// Async thunk to delete a task by ID
export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `${API_ENDPOINTS.TASK_DELETE}/${taskId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete task."
      );
    }
  }
);

// Async thunk to get task by ID
export const getTaskById = createAsyncThunk(
  "task/getTaskById",
  async (taskId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.TASK_GET}/${taskId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch task."
      );
    }
  }
);

// Async thunk to get all tasks
export const getAllTasks = createAsyncThunk(
  "task/getAllTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(API_ENDPOINTS.TASK_GET_ALL);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch all tasks."
      );
    }
  }
);

// Async thunk to assign a task to a user
export const assignTask = createAsyncThunk(
  "task/assignTask",
  async (
    { taskId, userId }: { taskId: string; userId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        `${API_ENDPOINTS.TASK_ASSIGN}/${taskId}/users/${userId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to assign task."
      );
    }
  }
);

// Async thunk to update task status
export const updateTaskStatus = createAsyncThunk(
  "task/updateTaskStatus",
  async (
    { taskId, status }: { taskId: string; status: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(
        `${API_ENDPOINTS.TASK_UPDATE_STATUS}/${taskId}`,
        { status }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update task status."
      );
    }
  }
);

// Async thunk to get tasks by user
export const getTasksByUser = createAsyncThunk(
  "task/getTasksByUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `${API_ENDPOINTS.TASK_GET_BY_USER}/${userId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tasks by user."
      );
    }
  }
);

// Async thunk to get tasks by project
export const getTasksByProject = createAsyncThunk(
  "task/getTasksByProject",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `${API_ENDPOINTS.TASK_GET_BY_PROJECT}/${projectId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tasks by project."
      );
    }
  }
);

// Async thunk to add attachments to a task
export const addAttachmentsToTask = createAsyncThunk(
  "task/addAttachments",
  async (
    { taskId, attachments }: { taskId: string; attachments: File[] },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      attachments.forEach((file) => formData.append("files", file));

      const response = await api.patch(
        `${API_ENDPOINTS.TASK_ADD_ATTACHMENTS}/${taskId}`,
        formData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add attachments."
      );
    }
  }
);

// Async thunk to remove an attachment from a task
export const removeAttachmentFromTask = createAsyncThunk(
  "task/removeAttachment",
  async (
    { taskId, attachmentId }: { taskId: string; attachmentId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.delete(
        `${API_ENDPOINTS.TASK_REMOVE_ATTACHMENT}/${taskId}/attachments/${attachmentId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove attachment."
      );
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
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createTask
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload); // Add the new task to the list
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle updateTask
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
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
        state.tasks = state.tasks.filter(
          (task: { id: unknown; }) => task.id !== action.payload.id
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle getTaskById
      .addCase(getTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
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
      });
  },
});

// Export actions and reducer
export const { clearTaskState, clearError } = taskSlice.actions;
export default taskSlice.reducer;
