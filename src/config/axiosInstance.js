import axios from "axios";

const BASE_URL = "http://143.110.242.217:8018/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
