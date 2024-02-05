import axios, { RawAxiosRequestHeaders } from "axios";
import { API_URL } from "../constants/constants";
import Cookie from "js-cookie";

export const getAuthHeaders = (): RawAxiosRequestHeaders => {
  const token = Cookie.get("access-token");
  return {
    Authorization: "Bearer " + token,
  };
};

export const AxiosInstance = axios.create({
  baseURL: API_URL,
  // withCredentials: true,
});
