import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://erino-backend-g8zt.onrender.com/api",
  withCredentials: true, // allow sending cookies (JWT stored in cookie)
});

export default api;
