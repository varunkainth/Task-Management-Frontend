/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";
import { API_ENDPOINTS } from "@/types/api";
import { Comment } from "@/types/auth"; // Assuming Comment type is defined in your types

// Define the initial state
interface CommentState {
  comments: Comment[];
  comment: Comment | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: CommentState = {
  comments: [],
  comment: null,
  loading: false,
  error: null,
  message: null,
};

// Async thunk to get all comments for a specific task
export const getAllCommentsForTask = createAsyncThunk(
  "comment/getAllCommentsForTask",
  async (taskId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.COMMENT_GET_ALL_SPECIFIC_TASK}/${taskId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch comments.");
    }
  }
);

// Async thunk to get a specific comment by ID
export const getCommentById = createAsyncThunk(
  "comment/getCommentById",
  async (commentId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.COMMENT_BY_ID}/${commentId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch comment.");
    }
  }
);

// Async thunk to create a new comment
export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({ taskId, commentData }: { taskId: string; commentData: Partial<Comment> }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_ENDPOINTS.COMMENT_CREATE}/${taskId}`, commentData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create comment.");
    }
  }
);

// Async thunk to update a comment
export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async ({ commentId, commentData }: { commentId: string; commentData: Partial<Comment> }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_ENDPOINTS.COMMENT_UPDATE}/${commentId}`, commentData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update comment.");
    }
  }
);

// Async thunk to delete a comment
export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (commentId: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${API_ENDPOINTS.COMMENT_DELETE}/${commentId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete comment.");
    }
  }
);

// Create the slice
const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    clearCommentState: (state) => {
      state.comment = null;
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
      // Handle getAllCommentsForTask
      .addCase(getAllCommentsForTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCommentsForTask.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getAllCommentsForTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle getCommentById
      .addCase(getCommentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommentById.fulfilled, (state, action) => {
        state.loading = false;
        state.comment = action.payload;
      })
      .addCase(getCommentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle createComment
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload); // Add the new comment to the list
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle updateComment
      .addCase(updateComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comment = action.payload; // Update the current comment details
        // Update the comments list if needed
        state.comments = state.comments.map((comment) =>
          comment.id === action.payload.id ? action.payload : comment
        );
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle deleteComment
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter((comment) => comment.id !== action.payload.id); // Remove the deleted comment
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { clearCommentState, clearError } = commentSlice.actions;
export default commentSlice.reducer;
