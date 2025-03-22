import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://redaezziani.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
