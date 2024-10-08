export const API_ENDPOINTS = {
  // Authentication Routes
  REGISTER: "/api/auth/register",
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",
  GOOGLE_SIGN: "/api/auth/google",
  GITHUB_SIGN: "/api/auth/github",
  VERIFY_EMAIL: "/api/auth/verify/email",
  VERIFY_TOTP: "/api/auth/verify/totp",
  CREATE_PASSWORD_TOKEN: "/api/auth/password-reset-token",
  VERIFY_PASSWORD_TOKEN: "/api/auth/verify-password-reset-token",
  PASSWORD_RESET_TOKEN: "/api/auth/use-password-reset-token",
  REFRESH_TOKEN: "/api/auth/refresh-token",
  REFRESH_TOKEN_REVOKE: "/api/auth/revoke-refresh-token",

  // User Management Routes
  USER_UPDATE_PROFILE: "/api/users/update",
  USER_UPDATE_PASSWORD: "/api/users/update-password",
  USER_UPDATE_PROFILE_PIC: "/api/users/update-profile-pic",
  USER_DELETE: "/api/users/delete",
  USER_GET: "/api/users/get/:id",
  USER_GET_ALL: "/api/users/get-all",

  // Project Routes
  PROJECT_CREATE: "/api/projects", // Create a project
  PROJECT_GET_ALL: "/api/projects", // Get all projects
  PROJECT_GET: "/api/projects/:id", // Get a project by ID
  PROJECT_UPDATE: "/api/projects/:id", // Update a project
  PROJECT_DELETE: "/api/projects/:id", // Delete a project
  PROJECT_DELETE_ALL_FOR_USER: "/api/projects/users/", // Delete all projects for a user

  // Task Routes
  TASK_CREATE: "/api/tasks/create",
  TASK_UPDATE: "/api/tasks/update", // Update task by id
  TASK_DELETE: "/api/tasks/delete", // Delete task by id
  TASK_GET: "/api/tasks", // Get task by id
  TASK_GET_ALL: "/api/tasks/get-all",
  TASK_ASSIGN: "/api/tasks/users/assign", //:userId :id
  TASK_UPDATE_STATUS: "/api/tasks/update-status", //:id
  TASK_GET_BY_USER: "/api/tasks/user", //  :userId
  TASK_GET_BY_PROJECT: "/api/tasks/projects", // :projectId
  TASK_ADD_ATTACHMENTS: "/api/tasks/attachments/add", // :id
  TASK_REMOVE_ATTACHMENT: "/api/tasks/attachments/remove", // :attachmentId :id

  // Sub-task API routes
  SUBTASK_CREATE: "/api/subtasks/tasks/:id", // Create a sub-task with file attachments
  SUBTASK_GET: "/api/subtasks/:id", // Get details of a sub-task
  SUBTASK_GET_ALL: "/api/subtasks/tasks/:id", // Get all sub-tasks for a specific task
  SUBTASK_UPDATE: "/api/subtasks/:id", // Update a sub-task
  SUBTASK_DELETE: "/api/subtasks/:id", // Delete a sub-task
  SUBTASK_ADD_ATTACHMENTS: "/api/subtasks/:id/attachments", // Add attachments to a sub-task
  SUBTASK_REMOVE_ATTACHMENT:
    "/api/subtasks/attachments/:subtaskId/:attachmentId", // Remove attachment from a sub-tasks

  // Comment Routes
  COMMENT_CREATE: "/api/comments/",
  COMMENT_UPDATE: "/api/comments", //:id
  COMMENT_DELETE: "/api/comments", // :id
  COMMENT_BY_ID: "api/comments", // :id
  COMMENT_GET_ALL_SPECIFIC_TASK: "/api/comments", // :taskId

  // Inviations Routes
  INVITATION_CREATE: "/api/invitations/projects/:projectId", // Create New Invitation POST Method
  INVITATION_UPDATE: "/api/invitations", // for Accept Or  Decline PUT Method
  INVITATION_DELETE: "/api/invitations", // Delete Method
  INVITATION_BY_ID: "/api/invitations/:id", // Get Invitation By Id GET Method
  INVITATION_FOR_SPECIFIC_PROJECT: "/api/inivitations/projects/", // :projectId Get Method

  // Notifications Routes
  NOTIFICATION_CREATE: "/api/notifications/",
  NOTIFICATION_UPDATE: "/api/notifications/:id",
  NOTIFICATION_DELETE: "/api/notifications/:id",
  NOTIFICATION_BY_ID: "/api/notifications/:id",
  NOTIFICATION_GET_ALL: "/api/notifications/",

  // Additional Routes (Slack, Trello, etc.)
  SLACK_CALENDAR_SYNC: "/api/integrations/slack/calendar-sync",
  TRELLO_INTEGRATE: "/api/integrations/trello",
  FILE_UPLOAD: "/api/integrations/file-upload",
} as const;

export type API_ENDPOINTS = typeof API_ENDPOINTS;
