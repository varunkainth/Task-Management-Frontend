
export const API_ENDPOINTS = {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    GOOGLE_SIGN: "/api/auth/google",
    GITHUB_SIGN: "/api/auth/github",
    VERIFY_EMAIL: "/api/auth/verify/email",
    VERIFY_TOTP:"/api/auth/verify/totp",
    CREATE_PASSWORD_TOKEN: "/api/auth/password-reset-token",
    VERIFY_PASSWORD_TOKEN:"/api/auth/verify-password-reset-token",
    PASSWORD_RESET_TOKEN:"/api/auth/use-password-reset-token",
    REFRESH_TOKEN:"/api/auth/refresh-token",
    REFRESH_TOKEN_REVOKE:"/api/auth/revoke-refresh-token"
  } as const;
  
  export type API_ENDPOINTS = typeof API_ENDPOINTS;