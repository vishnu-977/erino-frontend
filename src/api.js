import axios from 'axios';

const api = axios.create({
  baseURL: "https://erino-backend-g8zt.onrender.com/api",
  withCredentials: true  // ✅ important for cookies
});

export default api;
