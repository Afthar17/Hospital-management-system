import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.mode === "development" ? "http://localhost:5000/api" : "/api",

  withCredentials: true, //send cookie with request
});

export default axiosInstance;
// baseURL: "http://localhost:5000/api",
