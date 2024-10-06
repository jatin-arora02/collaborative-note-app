import axios from "axios";

// Axios instance with the base URL pointing to your backend server
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // The backend URL where your Express server is running
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
