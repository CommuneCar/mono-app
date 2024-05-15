import axios from 'axios';

const DEFAULT_BASE_API_URL=import.meta.env.VITE_BASE_API_URL || "http://localhost:8001"

const axiosClient = axios.create({
  baseURL: DEFAULT_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(response => {
  return response;
}, error => {
  console.log('Error:', error);
  return Promise.reject(error);
});

export { axiosClient };