import axios from 'axios';
console.log(process.env.REACT_APP_SERVER_URL);
export const BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

export default api;
