import axios from 'axios';
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const baseURL = publicRuntimeConfig.api;

export const apiClient = axios.create({
  baseURL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});
