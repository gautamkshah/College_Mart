import axios, { AxiosInstance } from 'axios';

// Create an Axios instance
const axiosClient: AxiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:3000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 2000, // All requests will wait 2 seconds before timeout
  withCredentials: true, // Send cookies and credentials with requests
});

export default axiosClient;
