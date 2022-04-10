import { AUTH_TOKEN_KEY } from '@/app/auth-archive/AuthContext';
import { isBrowser } from '@/utils/ssr';
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';


Axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = isBrowser ? localStorage.getItem(AUTH_TOKEN_KEY) : null;
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
    return {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
      ...config,
      headers: {
        ...authHeaders,
        ...config.headers,
      },
    };
  },
  (error) => Promise.reject(error)
);

Axios.interceptors.response.use((response: AxiosResponse) => {
  if (response.headers['x-total-count']) {
    return {
      content: response.data,
      totalItems: response?.headers['x-total-count'],
    };
  }
  return response.data;
});
