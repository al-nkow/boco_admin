export const API_DOMAIN =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_DOMAIN_PROD
    : process.env.REACT_APP_API_DOMAIN_DEV;

export const LOGIN = `${API_DOMAIN}/api/auth/`;
export const LOGOUT = `${API_DOMAIN}/api/auth/logout`;
export const USERS = `${API_DOMAIN}/api/users/`;
export const CURRENT_USER = `${API_DOMAIN}/api/me/`;
export const SHOPS = `${API_DOMAIN}/api/shops/`;
export const CATEGORIES = `${API_DOMAIN}/api/categories/`;
export const PRODUCTS = `${API_DOMAIN}/api/products/`;
export const POSITIONS = `${API_DOMAIN}/api/positions/`;
export const IMPORT = `${API_DOMAIN}/api/import/`;
export const WHOLESALE = `${API_DOMAIN}/api/wholesale/`;
export const SUPPLY = `${API_DOMAIN}/api/supply/`;
export const COOPERATIONS = `${API_DOMAIN}/api/cooperations/`;
