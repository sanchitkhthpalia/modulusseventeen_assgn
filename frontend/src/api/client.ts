import axios from 'axios';
import { getToken } from '../utils/storage';

export const API_BASE_URL = process.env.API_BASE_URL || 'http://10.0.2.2:4000';

export const api = axios.create({ baseURL: `${API_BASE_URL}/api` });

// Attach token if available (reads once per request)
api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


