// Reusable Attachment Type
export interface Attachment {
  filename: string; // Name of the file
  url: string; // URL of the file
  fileType: string; // Type of the file (e.g., image, document)
  uploadedAt: Date; // Date the file was uploaded
}

// Social Media Type
export interface SocialMedia {
  type?: string;
  url?: string;
}

// User Type
export interface User {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  profilePic?: string;
  createdAt: Date;
  updatedAt: Date;
  phoneNumber?: string;
  social?: SocialMedia[];
  dateOfBirth?: Date;
  gender?: string;
  provider?: string;
  totp_qr_url?: string;
}

// Comment Type
export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  timestamp: Date;
}

// Invitation Type
export interface Invitation {
  id: string;
  projectId: string;
  sender: string;
  email: string;
  status: "Pending" | "Accepted" | "Rejected";
  sentAt: Date;
}

// Notification Type
export interface Notification {
  id: string;
  userId: string;
  type: "Task Assignment" | "Project Update" | "Invitation";
  message: string;
  read: boolean;
  timestamp: Date;
  projectId?: string;
  taskId?: string;
  invitationId?: string;
}

// Project Type
export interface Project {
  id: string;
  name: string;
  description?: string;
  createdBy?: string;
  members?: string[];
  invites?: Invitation[];
  tasks?: Task[];
  createdAt?: Date;
  updatedAt?: Date;
}

// SubTask Type
export interface SubTask {
  id: string;
  title: string;
  description?: string;
  status: "Not Started" | "In Progress" | "Completed";
  taskId: string;
  priority: "Low" | "Medium" | "High";
  dueDate?: Date;
  attachments: Attachment[];
  createdAt: Date;
  updatedAt: Date;
}

// Task Type
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "Not Started" | "In Progress" | "Completed";
  priority: "High" | "Medium" | "Low";
  dueDate?: Date;
  dependencies: string[];
  projectId: string;
  comments: Comment[];
  subTasks: SubTask[];
  users: string[];
  attachments: Attachment[];
  createdAt: Date;
  updatedAt: Date;
}

// Auth State
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  success?: boolean;
  message?: string | null;
}

// Login Credentials Type
export interface LoginCredentials {
  email: string;
  password: string;
}

// Register Credentials Type
export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: string;
  dob: Date | null;
}

// User Data Type
export interface UserData {
  name: string;
  token: string;
  userId?: string;
  newPassword?: string;
}

// Auth Response Type
export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
  message: string;
}

// User Details Type
export interface UserDetails {
  name?: string;
  email?: string;
  phoneNumber?: string;
  social?: SocialMedia[];
  dateOfBirth?: Date;
  gender?: string;
  profilePic?: string;
  userId?: string;
}
