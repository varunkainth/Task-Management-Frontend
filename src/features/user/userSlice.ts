/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { user, UserData } from "@/types/auth"; // Assuming you have this type defined
import api from "@/api/api";
import { API_ENDPOINTS } from "@/types/api";

// Define the initial state
interface UserState {
  user: UserData | null;
  users: UserData[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: UserState = {
  user: null,
  users: [],
  loading: false,
  error: null,
  message: null,
};

// Async thunk to get all users
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(API_ENDPOINTS.USER_GET_ALL);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk to get user details
export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (userData:user, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.USER_GET}/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk to update user details
export const updateUserDetails = createAsyncThunk(
  "user/updateUserDetails",
  async (userData: Partial<UserData>, { rejectWithValue }) => {
    try {
      const response = await api.put(
        API_ENDPOINTS.USER_UPDATE_PROFILE,
        userData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk to update user password
export const updateUserPassword = createAsyncThunk(
  "user/updateUserPassword",
  async (
    passwordData: { oldPassword: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(
        API_ENDPOINTS.USER_UPDATE_PASSWORD,
        passwordData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk to update profile picture
export const updateProfilePic = createAsyncThunk(
  "user/updateProfilePic",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        API_ENDPOINTS.USER_UPDATE_PROFILE_PIC,
        formData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk to delete a user
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete(API_ENDPOINTS.USER_DELETE);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Create the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.user = null;
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
      // Handle getAllUsers
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle getUserDetails
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle updateUserDetails
      .addCase(updateUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle updateUserPassword
      .addCase(updateUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle updateProfilePic
      .addCase(updateProfilePic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfilePic.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfilePic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle deleteUser
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { clearUserState, clearError } = userSlice.actions;
export default userSlice.reducer;
