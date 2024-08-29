export interface SocialMedia {
  provider?: string;
  url?: string;
}

export interface User {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  profilePic?: string;
  createdAt?: Date;
  updatedAt?: Date;
  phoneNumber?: string;
  social?: SocialMedia;
  dateOfbirth?: Date;
  gender?: string;
  provider?: string;
  totp_qr_url?:string
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  success?: boolean;
  message?: string | null;
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

export interface UserData {
  token: string;
  newPassword?: string;
}
export interface AuthResponse {
  success: boolean | undefined;
  token: string;
  user: User;
  message: string;
}


export interface user{
  name?:string
  email?:string
  phoneNumber?:string
  social?:SocialMedia
  dateOfBirth?:Date
  gender?:string
  profilePic?:string
}