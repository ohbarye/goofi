import axios from 'axios';
import getConfig from "next/config";
const { env } = getConfig();

const baseURL = env.api;

export const apiClient = axios.create({
  baseURL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});
