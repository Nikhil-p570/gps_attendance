import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add response interceptor to handle errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else {
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;