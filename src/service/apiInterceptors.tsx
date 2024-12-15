import axios from "axios";
import { BASE_URL } from "./config";
import { refresh_tokens } from "./authService";
import { Alert } from "react-native";

export const appAxios = axios.create({
      baseURL: BASE_URL,
});

appAxios.interceptors.request.use(async config => {
      const token = localStorage.getString('accessToken');
      if (token) {
            config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
});

appAxios.interceptors.response.use(response => {
      return response;
}, async error => {
      if (error.response && error.response.status === 401) {
            try {
                  const newAccessToken = await refresh_tokens()
                  if (newAccessToken) {
                        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                        return axios(error.config);
                  }
            }
            catch (e) {
                  console.log("Error in refreshing token", e)
            }
      }
      if(error.response && error.response.status!=401){
            const errorMessagw= error.response.data.message || "Something went wrong"
            Alert.alert("Error")

      }
      return  Promise.resolve(error)
});