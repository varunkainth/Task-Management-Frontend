/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";
import { API_ENDPOINTS } from "@/types/api";
import { Invitation } from "@/types/auth"; // Assuming Invitation type is defined in your types

// Define the initial state
interface InvitationState {
  invitations: Invitation[];
  invitation: Invitation | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: InvitationState = {
  invitations: [],
  invitation: null,
  loading: false,
  error: null,
  message: null,
};

// Async thunk to get all invitations for a user
export const getAllInvitations = createAsyncThunk(
  "invitation/getAllInvitations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(API_ENDPOINTS.INVITATION_GET_ALL);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch invitations.");
    }
  }
);

// Async thunk to create a new invitation
export const createInvitation = createAsyncThunk(
  "invitation/createInvitation",
  async (invitationData: Partial<Invitation>, { rejectWithValue }) => {
    try {
      const response = await api.post(API_ENDPOINTS.INVITATION_CREATE, invitationData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create invitation.");
    }
  }
);

// Async thunk to accept an invitation
export const acceptInvitation = createAsyncThunk(
  "invitation/acceptInvitation",
  async (invitationId: string, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_ENDPOINTS.INVITATION_ACCEPT}/${invitationId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to accept invitation.");
    }
  }
);

// Async thunk to decline an invitation
export const declineInvitation = createAsyncThunk(
  "invitation/declineInvitation",
  async (invitationId: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${API_ENDPOINTS.INVITATION_DELETE}/${invitationId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to decline invitation.");
    }
  }
);

// Create the slice
const invitationSlice = createSlice({
  name: "invitation",
  initialState,
  reducers: {
    clearInvitationState: (state) => {
      state.invitation = null;
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
      // Handle getAllInvitations
      .addCase(getAllInvitations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllInvitations.fulfilled, (state, action) => {
        state.loading = false;
        state.invitations = action.payload;
      })
      .addCase(getAllInvitations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle createInvitation
      .addCase(createInvitation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInvitation.fulfilled, (state, action) => {
        state.loading = false;
        state.invitations.push(action.payload); // Add the new invitation to the list
      })
      .addCase(createInvitation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle acceptInvitation
      .addCase(acceptInvitation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptInvitation.fulfilled, (state, action) => {
        state.loading = false;
        // Update the invitations list after accepting
        state.invitations = state.invitations.filter(inv => inv.id !== action.payload.id);
      })
      .addCase(acceptInvitation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle declineInvitation
      .addCase(declineInvitation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(declineInvitation.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the declined invitation from the list
        state.invitations = state.invitations.filter(inv => inv.id !== action.payload.id);
      })
      .addCase(declineInvitation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { clearInvitationState, clearError } = invitationSlice.actions;
export default invitationSlice.reducer;
