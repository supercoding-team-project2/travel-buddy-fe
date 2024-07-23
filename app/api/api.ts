import axios from "axios";

const api = axios.create({
  baseURL: "http://백엔드 배포ip",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
