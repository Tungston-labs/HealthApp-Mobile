import axios from "axios";

const refreshApi = axios.create({
  baseURL: "http://178.248.112.16:9001/api/",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default refreshApi;
