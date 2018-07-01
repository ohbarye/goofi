import axios from 'axios';

const baseURL = process.env.API_END_POINT || 'http://localhost:5000'; // 'https://goofi-server.herokuapp.com/'

export const apiClient = axios.create({
  baseURL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});
