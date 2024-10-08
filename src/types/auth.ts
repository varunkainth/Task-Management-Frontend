export interface SocialMedia {
  type?: string;
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
  social?: SocialMedia[];
  dateOfbirth?: Date;
  gender?: string;
  provider?: string;
  totp_qr_url?: string;
}

// Comment Type
export interface Comment {
  id: string; // Comment ID
  taskId: string; // ID of the task this comment belongs to
  userId: string; // ID of the user who made the comment
  content: string; // Comment content
  timestamp: Date; // Timestamp of the comment
}

// Invitation Type
export interface Invitation {
  id?: string; // Invitation ID
  projectId?: string; // ID of the project the invitation is for
  sender?: string; // ID of the user who sent the invitation
  email?: string; // Email of the invited user
  status?: "Pending" | "Accepted" | "Rejected"; // Status of the invitation
  sentAt?: Date; // Date the invitation was sent
}

// Notification Type
export interface Notification {
  id: string; // Notification ID
  userId: string; // ID of the user who receives the notification
  type: "Task Assignment" | "Project Update" | "Invitation"; // Type of the notification
  message: string; // Notification message
  read: boolean; // Read status
  timestamp: Date; // Timestamp of the notification
  projectId?: string; // ID of the related project (optional)
  taskId?: string; // ID of the related task (optional)
  invitationId?: string; // ID of the related invitation (optional)
}

// Project Type
export interface Project {
  id: string; // Project ID
  name: string; // Project name
  description?: string; // Project description (optional)
  createdBy: string; // ID of the user who created the project
  members: string[]; // IDs of users who are members of the project
  invites: {
    email: string; // Email of the invited user
    status: "Pending" | "Accepted" | "Rejected"; // Status of the invitation
    sentAt: Date; // Date the invitation was sent
  }[]; // List of invitations
  tasks: Task[]; // IDs of tasks in the project
  createdAt: Date; // Date the project was created
  updatedAt: Date; // Date the project was last updated
}

// SubTask Type
export interface SubTask {
  id: string; // SubTask ID
  title: string; // Title of the subtask
  description?: string; // Description of the subtask (optional)
  status: "Not Started" | "In Progress" | "Completed"; // Status of the subtask
  taskId: string; // ID of the task this subtask belongs to
  priority: "Low" | "Medium" | "High"; // Priority level
  dueDate?: Date; // Due date (optional)
  attachments: {
    filename: string; // Name of the file
    url: string; // URL of the file
    fileType: string; // Type of the file (e.g., image, document)
    uploadedAt: Date; // Date the file was uploaded
  }[]; // List of attachments
  createdAt: Date; // Date the subtask was created
  updatedAt: Date; // Date the subtask was last updated
}

// Task Type
export interface Task {
  id: string; // Task ID
  title: string; // Task title
  description?: string; // Task description (optional)
  status: "Not Started" | "In Progress" | "Completed"; // Status of the task
  priority: "High" | "Medium" | "Low"; // Priority level
  dueDate?: Date; // Due date (optional)
  dependencies: string[]; // IDs of dependent tasks
  projectId: string; // ID of the project this task belongs to
  comments: Comment[]; // List of comments on the task
  subTasks: SubTask[]; // List of subtasks associated with this task
  users: string[]; // IDs of users assigned to this task
  attachments: {
    filename: string; // Name of the file
    url: string; // URL of the file
    fileType: string; // Type of the file (e.g., image, document)
    uploadedAt: Date; // Date the file was uploaded
  }[]; // List of attachments
  createdAt: Date; // Date the task was created
  updatedAt: Date; // Date the task was last updated
}

// Authentication State
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

// Authentication Response Type
export interface AuthResponse {
  success: boolean | undefined;
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
