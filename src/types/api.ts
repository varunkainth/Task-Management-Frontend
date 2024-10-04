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
  PROJECT_CREATE: "/api/projects/create",
  PROJECT_UPDATE: "/api/projects/update",
  PROJECT_DELETE: "/api/projects/delete",
  PROJECT_GET: "/api/projects/get/:id",
  PROJECT_GET_ALL: "/api/projects/get-all",

  // Task Routes
  TASK_CREATE: "/api/tasks/create",
  TASK_UPDATE: "/api/tasks/update",
  TASK_DELETE: "/api/tasks/delete",
  TASK_GET: "/api/tasks/get/:id",
  TASK_GET_ALL: "/api/tasks/get-all",

  // Subtask Routes
  SUBTASK_CREATE: "/api/subtasks/create",
  SUBTASK_UPDATE: "/api/subtasks/update",
  SUBTASK_DELETE: "/api/subtasks/delete",
  SUBTASK_GET: "/api/subtasks/get/:id",
  SUBTASK_GET_ALL: "/api/subtasks/get-all",

  // Comment Routes
  COMMENT_CREATE: "/api/comments/",
  COMMENT_UPDATE: "/api/comments/:id",
  COMMENT_DELETE: "/api/comments/:id",
  COMMENT_BY_ID: "api/comments/:id",
  COMMENT_GET_ALL_SPECIFIC_TASK: "/api/comments/:taskId/comments",

  // Inviations Routes
  INVITATION_CREATE: "/api/invitations/projects/:projectId",
  INVITATION_UPDATE: "/api/invitations/:id",
  INVITATION_DELETE: "/api/invitations/:id",
  INVITATION_BY_ID: "/api/invitations/:id",
  INVITATION_GET_ALL: "/api/invitations/projects/:projectId/invitations",
  INVITATION_FOR_SPECIFIC_PROJECT: "/api/inivitations/projects/",

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
