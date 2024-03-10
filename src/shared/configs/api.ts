import axios from "axios";
import { API_TIMEOUT } from "../constants/constants";

export const AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: API_TIMEOUT,
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});
