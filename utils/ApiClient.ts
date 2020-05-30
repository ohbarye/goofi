import axios from "axios";

const baseURL = process.env.api;

export const apiClient = axios.create({
  baseURL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
