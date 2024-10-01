import axios from "axios";

const getToken = (): string | null => {
  const token = localStorage.getItem("token");

  if (token) {
    const cleanedToken = token.replace(/"/g, "").trim();
    return cleanedToken;
  }

  return null;
};

const api = axios.create({
  // baseURL: "https://task-management-vlac.onrender.com",
  // baseURL: "https://sturdy-waffle-j49p766xg653pw45-8000.app.github.dev",
  // baseURL: "https://redesigned-garbanzo-v6gjwq4vp9963x9q6-8000.app.github.dev",
  // baseURL: "https://sturdy-waffle-j49p766xg653pw45-8000.app.github.dev",
  baseURL: "https://task-management-backend-os4y.onrender.com",
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
