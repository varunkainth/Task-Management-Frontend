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

// Async thunk to get all invitations for a project
export const getAllInvitationsForProject = createAsyncThunk(
  "invitation/getAllInvitations",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `${API_ENDPOINTS.INVITATION_FOR_SPECIFIC_PROJECT}/${projectId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch invitations."
      );
    }
  }
);

// Async thunk to create a new invitation
export const createInvitation = createAsyncThunk(
  "invitation/createInvitation",
  async (invitationData: Partial<Invitation>, { rejectWithValue }) => {
    try {
      const response = await api.post(
        API_ENDPOINTS.INVITATION_CREATE,
        invitationData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create invitation."
      );
    }
  }
);

// Async thunk to update the status of an invitation
export const updateInvitationStatus = createAsyncThunk(
  "invitation/updateInvitationStatus",
  async (
    { invitationId, status }: { invitationId: string; status: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(
        `${API_ENDPOINTS.INVITATION_UPDATE}/${invitationId}`,
        { status } // Sending status in request body
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update invitation status."
      );
    }
  }
);

// Async thunk to get an invitation by its ID
export const getInvitationById = createAsyncThunk(
  "invitation/getInvitationById",
  async (invitationId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `${API_ENDPOINTS.INVITATION_BY_ID}/${invitationId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get invitation."
      );
    }
  }
);

// Create the slice
const invitationSlice = createSlice({
  name: "invitation",
  initialState,
  reducers: {
    // Clear the entire invitation state
    clearInvitationState: (state) => {
      state.invitations = [];
      state.invitation = null;
      state.loading = false;
      state.error = null;
      state.message = null;
    },
    // Clear error and message fields
    clearError: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllInvitationsForProject
      .addCase(getAllInvitationsForProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllInvitationsForProject.fulfilled, (state, action) => {
        state.loading = false;
        state.invitations = action.payload; // Replace the invitations with fetched data
      })
      .addCase(getAllInvitationsForProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // createInvitation
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

      // updateInvitationStatus
      .addCase(updateInvitationStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInvitationStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedInvitationIndex = state.invitations.findIndex(
          (invitation) => invitation.id === action.payload.id
        );
        if (updatedInvitationIndex !== -1) {
          state.invitations[updatedInvitationIndex] = action.payload; // Update the specific invitation in the list
        }
      })
      .addCase(updateInvitationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // getInvitationById
      .addCase(getInvitationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInvitationById.fulfilled, (state, action) => {
        state.loading = false;
        state.invitation = action.payload; // Set the specific invitation in state
      })
      .addCase(getInvitationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { clearInvitationState, clearError } = invitationSlice.actions;
export default invitationSlice.reducer;
