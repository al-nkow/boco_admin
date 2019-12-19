import {
  LOGIN,
  LOGOUT,
  USERS,
  SHOPS,
  CATEGORIES,
  PRODUCTS,
  POSITIONS,
} from './services/APIEndpoints';
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
export const updateShop = (id, data) =>
  API({
    method: 'put',
    url: `${SHOPS}${id}`,
    data,
    config: { headers: { 'Content-Type': 'multipart/form-data' } },
  });

// CATEGORIES
export const createCategory = params => API.post(CATEGORIES, params);
export const getCategoriesList = () => API.get(CATEGORIES);
export const getCategoryById = id => API.get(`${CATEGORIES}${id}`);
export const deleteCategoryById = id =>
  API.delete(`${CATEGORIES}${id}`);
export const updateCategory = (id, data) =>
  API.put(`${CATEGORIES}${id}`, data);

// PRODUCTS
export const createProduct = params => API.post(PRODUCTS, params);
export const getProductsList = params =>
  API.get(PRODUCTS, { params });
export const getProductById = id => API.get(`${PRODUCTS}${id}`);
export const deleteProductById = id => API.delete(`${PRODUCTS}${id}`);
export const updateProduct = (id, data) =>
  API.put(`${PRODUCTS}${id}`, data);

// POSITIONS
export const createPosition = params => API.post(POSITIONS, params);
export const getPositionsList = params =>
  API.get(POSITIONS, { params });
export const deletePositionById = id =>
  API.delete(`${POSITIONS}${id}`);
