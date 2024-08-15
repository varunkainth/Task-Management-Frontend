import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

const api = axios.create({
  // baseURL: "https://task-management-vlac.onrender.com",
  baseURL: "https://sturdy-waffle-j49p766xg653pw45-8000.app.github.dev",
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
