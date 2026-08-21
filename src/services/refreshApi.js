import axios from "axios";
import { API_BASE_URL } from "./api";

const refreshApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default refreshApi;

