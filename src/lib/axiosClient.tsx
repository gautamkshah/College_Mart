// import axios, {AxiosInstance} from 'axios';
// // Import your MMKV storage
// import {tokenStorage} from '../state/storage';



// const axiosClient: AxiosInstance = axios.create({
//   baseURL: 'http://10.0.2.2:3000',
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//     Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzVmMTViZmEzN2UxMzg0MDE5Yjc5YTgiLCJyb2xlIjoiRGVsaXZlcnlQYXJ0bmVyIiwiaWF0IjoxNzM3NjYwNjgxLCJleHAiOjE3Mzc3NDcwODF9.vTJHOjvwSAv1RpTlFh93LRSNRNVZM2A5uWKK-43f_fg'}`,
//   },
//   timeout: 2000,
//   withCredentials: true,
// });



// export default axiosClient;
import axios, { AxiosInstance } from 'axios';
import { tokenStorage } from '../state/storage'; // MMKV or your storage library for managing tokens
import { Alert } from 'react-native';
import { refresh_tokens } from '@service/authService';

const axiosClient: AxiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:3000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 2000,
  withCredentials: true,
});

// Request interceptor to dynamically set the Authorization header
axiosClient.interceptors.request.use(async (config) => {
  const token = tokenStorage.getString('accessToken'); // Get the token from your storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token expiration and refreshing
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        // Attempt to refresh tokens
        const newAccessToken = await refresh_tokens();
        if (newAccessToken) {
          // Update the failed request with the new token
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        // Optional: handle token refresh failure, e.g., log out the user
      }
    }
    // Handle other response errors
    if (error.response && error.response.status !== 401) {
      const errorMessage = error.response.data.message || 'Something went wrong';
      Alert.alert('Error', errorMessage);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
