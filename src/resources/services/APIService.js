import axios from 'axios';
import history from '../../history';
import { API_DOMAIN } from './APIEndpoints';
import { AUTH_TOKEN } from '../../config/constants';

const token = localStorage.getItem(AUTH_TOKEN.NAME);
const apiOptions = {
  baseURL: API_DOMAIN,
  headers: {
    'x-auth-token': token,
  },
};
const APIService = axios.create(apiOptions);

export const saveToken = data => {
  if (!data.token) return;
  localStorage.setItem(AUTH_TOKEN.NAME, data.token);
  localStorage.setItem(AUTH_TOKEN.REFRESH, data.refreshToken);
  localStorage.setItem(AUTH_TOKEN.EXPIRES, data.expiresIn);
  localStorage.setItem(AUTH_TOKEN.USER_ID, data.userId);
  APIService.defaults.headers['x-auth-token'] = `${data.token}`;
};

export const saveUserRole = role => {
  if (!role) return;
  localStorage.setItem('role', role);
};

export const clearToken = () => {
  localStorage.setItem(AUTH_TOKEN.NAME, undefined);
  localStorage.setItem(AUTH_TOKEN.REFRESH, undefined);
  localStorage.setItem(AUTH_TOKEN.EXPIRES, undefined);
  localStorage.setItem(AUTH_TOKEN.USER_ID, undefined);
  APIService.defaults.headers.common['x-auth-token'] = undefined;
};
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

APIService.interceptors.request.use(
  async config => {
    if (config.url.indexOf('/api/auth/') !== -1) return config;

    if (localStorage.getItem(AUTH_TOKEN.EXPIRES) * 1000 >= Date.now())
      return config;

    const refreshToken = localStorage.getItem(AUTH_TOKEN.REFRESH);
    if (!refreshToken) return config;

    // Если токен протух - просим новый токен!
    const result = await fetch(API_DOMAIN + '/api/auth/token', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: refreshToken }),
    });

    // если рефреш токен тоже протух
    if (result && result.status === 401) {
      localStorage.clear();
      history.push('/login');
      const error = new Error('Unauthorized');
      return Promise.reject(error);
    }

    const newAuthData = await result.json();

    saveToken(newAuthData);
    if (newAuthData.token)
      config.headers['x-auth-token'] = `${newAuthData.token}`;

    return config;
  },
  error => Promise.reject(error),
);

// Add a response interceptor
APIService.interceptors.response.use(
  response => response,
  error => {
    if (error && error.response && error.response.status === 401) {
      clearToken();
      history.push('/login');
    }
    return Promise.reject(error);
  },
);

export default APIService;
