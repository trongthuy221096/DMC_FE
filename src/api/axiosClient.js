import axios from "axios";
import queryString from "query-string";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify({ ...params }),
});

axiosClient.interceptors.request.use(
  (config) => {
    // Lấy access token từ cookie
    const accessToken = cookies.get("token");

    // Nếu access token tồn tại, thêm nó vào tiêu đề "Authorization"
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
