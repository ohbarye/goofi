import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://goofi-server.herokuapp.com/',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});
