import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL:
    import.meta.mode === "development" ? "http://localhost:5000/api" : "/api",

  withCredentials: true, //send cookie with request
});

export default axiosInstance;
