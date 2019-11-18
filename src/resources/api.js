import { LOGIN, LOGOUT, USERS, SHOPS } from './services/APIEndpoints';
import API from './services/APIService';

// AUTH
export const login = params => API.post(LOGIN, { ...params });
export const logout = params => API.post(LOGOUT, { ...params });

// USERS
export const getUsersList = () => API.get(USERS);
export const deleteUserById = id => API.delete(`${USERS}${id}`);
export const registerUser = params => API.post(USERS, params);

// SHOPS
export const createShop = data =>
  API({
    method: 'post',
    url: SHOPS,
    data,
    config: { headers: { 'Content-Type': 'multipart/form-data' } },
  });
export const getShopsList = () => API.get(SHOPS);
export const deleteShopById = id => API.delete(`${SHOPS}${id}`);
