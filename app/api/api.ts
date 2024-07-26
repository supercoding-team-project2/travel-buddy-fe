import axios from "axios";

const api = axios.create({
  baseURL: "http://3.35.141.253:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

//process.env.NEXT_PUBLIC_SERVER_URL
