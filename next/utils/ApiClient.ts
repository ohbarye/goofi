import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? 'https://goofi-server.herokuapp.com/' : 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});
