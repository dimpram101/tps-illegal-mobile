import axios from "axios";

export const BASE_URL = "http://192.168.1.104:5000/";

const api = axios.create({
  baseURL: `${BASE_URL}api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
