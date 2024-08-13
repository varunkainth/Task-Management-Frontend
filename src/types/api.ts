
export const API_ENDPOINTS = {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    GOOGLE_SIGN: "/api/auth/google",
    GITHUB_SIGN: "/api/auth/github",
    VERIFY_EMAIL: "/api/auth/verify/email"
  } as const;
  
  
  export type API_ENDPOINTS = typeof API_ENDPOINTS;
  