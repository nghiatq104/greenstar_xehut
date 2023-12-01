import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { ENDPOINT } from "../constants/url";
import { showMessage } from "react-native-flash-message";

class Store {
  __token = "";
  __refresh_token = "";
  __username = "";
  //Token
  async getToken() {
    return this.__token || (await AsyncStorage.getItem("green_star_token"));
  }

  async setToken(token) {
    this.__token = token;
    await AsyncStorage.setItem("green_star_token", token);
  }

  async removeToken() {
    this.__token = "";
    await AsyncStorage.removeItem("green_star_token");
  }
  //Username
  async getUsername() {
    return (
      this.__username || (await AsyncStorage.getItem("green_star_username"))
    );
  }

  async setUsername(username) {
    this.__username = username;
    await AsyncStorage.setItem("green_star_username", username);
  }

  async removeUsername() {
    this.__username = "";
    await AsyncStorage.removeItem("green_star_username");
  }
  //Refresh token
  async getRefreshToken() {
    return (
      this.__refresh_token ||
      (await AsyncStorage.getItem("green_star_refresh_token"))
    );
  }

  async setRefreshToken(token) {
    this.__refresh_token = token;
    await AsyncStorage.setItem("green_star_refresh_token", token);
  }

  async removeRefreshToken() {
    this.__refresh_token = "";
    await AsyncStorage.removeItem("green_star_refresh_token");
  }
}

export const storeT = new Store();

export function isNetworkError(err) {
  return !!err.isAxiosError && !err.response;
}

export function handleError(error) {
  if (isNetworkError(error)) {
    showMessage({
      message: "Không có kết nối mạng!",
      type: "danger",
      icon: { icon: "danger", position: "left" }
    });

    return 1;
  }
  return 0;
}

const http = axios.create({
  baseURL: ENDPOINT,
  timeout: 180000,
  headers: { "Content-Type": "application/json" }
});

http.interceptors.request.use(
  async function(config) {
    const token = await storeT.getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return Promise.resolve(config);
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default http;
