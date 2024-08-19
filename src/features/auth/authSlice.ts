/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/api/api";
import {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  User,
  UserData,
} from "@/types/auth";
import { API_ENDPOINTS } from "@/types/api";

const setLocalStorage = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Error setting localStorage", err);
  }
};

const getLocalStorage = <T>(key: string): T | null => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (error) {
    console.error("Error getting localStorage", error);
    return null;
  }
};

export const emailVerify = createAsyncThunk<AuthResponse, string>(
  "auth/verify/email",
  async (email, { rejectWithValue }) => {
    try {
      // console.log("/",API_ENDPOINTS.VERIFY_EMAIL)
      const response = await api.post(API_ENDPOINTS.VERIFY_EMAIL, { email });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const register = createAsyncThunk<AuthResponse, RegisterCredentials>(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post<AuthResponse>(
        API_ENDPOINTS.REGISTER,
        userData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

export const login = createAsyncThunk<AuthResponse, LoginCredentials>(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post<AuthResponse>(
        API_ENDPOINTS.LOGIN,
        userData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const logout = createAsyncThunk<void, void>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post(API_ENDPOINTS.LOGOUT);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);

export const googleSignup = createAsyncThunk<AuthResponse, string>(
  "auth/google",
  async (idToken, { rejectWithValue }) => {
    try {
      const response = await api.post<AuthResponse>(API_ENDPOINTS.GOOGLE_SIGN, {
        id: idToken,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Google signup failed");
    }
  }
);

export const githubSignup = createAsyncThunk<AuthResponse, string>(
  "auth/github",
  async (idToken, { rejectWithValue }) => {
    try {
      const response = await api.post<AuthResponse>(API_ENDPOINTS.GITHUB_SIGN, {
        idToken,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "GitHub signup failed");
    }
  }
);

export const CreatepasswordresetToken = createAsyncThunk<AuthResponse, string>(
  "auth/create/passwordtoken",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post<AuthResponse>(
        API_ENDPOINTS.CREATE_PASSWORD_TOKEN,
        {email}
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || "Failed to create password reset token"
      );
    }
  }
);

export const VerifyPasswordToken = createAsyncThunk<AuthResponse, string>(
  "auth/verify/PasswordToken",
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.post<AuthResponse>(
        API_ENDPOINTS.VERIFY_PASSWORD_TOKEN,
        token
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || "Failed to verify password reset token"
      );
    }
  }
);

export const UsePasswordToken = createAsyncThunk<AuthResponse, UserData>(
  "auth/passwordToken",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post<AuthResponse>(
        API_ENDPOINTS.PASSWORD_RESET_TOKEN,
        userData
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || "Failed to use password reset token"
      );
    }
  }
);

export const RefreshToken = createAsyncThunk<AuthResponse,string>(
  "auth/refreshToken",
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.post<AuthResponse>(
        API_ENDPOINTS.REFRESH_TOKEN,
        token
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to refresh token");
    }
  }
);

export const RevokeRefreshToken = createAsyncThunk<AuthResponse,string>(
  "auth/RevokeRefreshToken",
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.post<AuthResponse>(
        API_ENDPOINTS.REFRESH_TOKEN_REVOKE,
        token
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || "Failed to revoke refresh token"
      );
    }
  }
);

const initialState: AuthState = {
  user: getLocalStorage<User>("user"),
  token: getLocalStorage<string>("token"),
  error: null,
  loading: false,
  isAuthenticated: !!getLocalStorage<string>("token"),
  success: false,
};

// Slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        setLocalStorage("user", action.payload.user);
        setLocalStorage("token", action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          setLocalStorage("user", action.payload.user);
          setLocalStorage("token", action.payload.token);
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(googleSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        googleSignup.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          setLocalStorage("user", action.payload.user);
          setLocalStorage("token", action.payload.token);
        }
      )
      .addCase(googleSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(githubSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        githubSignup.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          setLocalStorage("user", action.payload.user);
          setLocalStorage("token", action.payload.token);
        }
      )
      .addCase(githubSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(emailVerify.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(emailVerify.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.success = action.payload.success;
        setLocalStorage("success", action.payload);
      })
      .addCase(emailVerify.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(CreatepasswordresetToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreatepasswordresetToken.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(
        CreatepasswordresetToken.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          state.success = false;
        }
      )

      .addCase(VerifyPasswordToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VerifyPasswordToken.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(
        VerifyPasswordToken.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          state.success = false;
        }
      )

      .addCase(UsePasswordToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        UsePasswordToken.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.success = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      )
      .addCase(
        UsePasswordToken.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          state.success = false;
        }
      )

      .addCase(RefreshToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        RefreshToken.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.success = true;
          state.token = action.payload.token;
        }
      )
      .addCase(RefreshToken.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(RevokeRefreshToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RevokeRefreshToken.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.token = null;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(
        RevokeRefreshToken.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          state.success = false;
        }
      )
      .addDefaultCase((state) => {
        state.loading = false;
        state.error = null;
      });
  },
});

// Export actions and reducer
export const selectIsAuthenticated = (state: { auth: { token: any } }) =>
  !!state.auth.token;
export const { clearError } = authSlice.actions;
export default authSlice.reducer;
