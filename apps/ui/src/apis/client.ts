import axios from 'axios';

const DEFAULT_BASE_API_URL="http://localhost:8001"


// Setup Axios instance
const axiosClient = axios.create({
  baseURL: DEFAULT_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor to log responses
axiosClient.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
}, error => {
  console.log('Error:', error);
  return Promise.reject(error);
});

export default axiosClient;
