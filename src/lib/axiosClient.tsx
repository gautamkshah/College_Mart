import axios, { AxiosInstance } from 'axios';
// Import your MMKV storage
import { tokenStorage } from '../state/storage';

// const token=tokenStorage.getString('token')


const axiosClient: AxiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:3000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzM3MDdhMjdhNDAxOGEyNzBhYTM0ZDEiLCJyb2xlIjoiQ3VzdG9tZXIiLCJpYXQiOjE3MzU5MzA3NDYsImV4cCI6MTczNjAxNzE0Nn0.wnEvjzcOS8PfTXZxhBOvf_S8aoqbvRIl-WDf6LvoUb4"}`,
  },
  timeout: 2000,
  withCredentials: true,
});

export default axiosClient;
