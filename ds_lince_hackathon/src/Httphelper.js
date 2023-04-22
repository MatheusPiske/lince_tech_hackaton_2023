import axios from "axios";

const http = axios.create({
  withCredentials: true,
  baseURL:
    process.env.NODE_ENV === "production" ? null : "http://10.0.11.174:9000/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true
});

export default http;
