import axios, { AxiosError, AxiosResponse } from "axios";
import Cookie from "js-cookie";
import { API_TIMEOUT, API_URL } from "../constants/constants";

const token = Cookie.get("access-token");

export const AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Authorization: "Bearer " + token,
  },
});

AxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      Cookie.remove("access-token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
