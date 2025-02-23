import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://192.168.31.181:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
