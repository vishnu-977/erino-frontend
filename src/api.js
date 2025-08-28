import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://erino-backend-g8zt.onrender.com",
  withCredentials: true, // allow cookies (important for auth if using cookies)
});

// ✅ Attach token from localStorage for every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
