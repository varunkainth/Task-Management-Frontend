export interface User {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  profilePic?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  success?:boolean
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: string;
  dob: Date | null;
}
export interface AuthResponse{
    success: boolean | undefined;
    token: string;
    user:User;
    message:string
}
