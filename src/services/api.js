// api.js
import axios from 'axios';
import {
  getRefreshToken,
  setRefreshToken,
  clearStorage,
} from '../storage/asyncStorage';
import { store } from '../redux/store';
import { setAccessToken } from '../redux/slices/authSlice';

export const API_BASE_URL = 'http://178.248.112.16:9001/api/';
// const BASE_URL = 'http://10.0.2.2:8000/api/';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
  },
});

export const publicApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async config => {
  const token = store.getState().auth.accessToken;

  if (token && !config.skipAuth) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom =>
    error ? prom.reject(error) : prom.resolve(token),
  );
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.skipAuth
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const refresh = await getRefreshToken();
        if (!refresh) throw new Error('No refresh token');

        const response = await publicApi.post('auth/token/refresh/', {
          refresh,
        });
        if (!response?.data?.data?.access) {
          throw new Error('Invalid refresh response');
        }
        store.dispatch(setAccessToken(response?.data?.data?.access));

        if (response?.data?.data?.refresh) {
          await setRefreshToken(response.data.data.refresh);
        }

        processQueue(null, response.data.data.access);

        originalRequest.headers.Authorization = `Bearer ${response.data.data.access}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        await clearStorage();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;