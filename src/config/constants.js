export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_DOMAIN_PROD
    : process.env.REACT_APP_API_DOMAIN_DEV;

export const DEFAULT_PASSWORD =
  process.env.NODE_ENV === 'production'
    ? ''
    : process.env.REACT_APP_DEFAULT_PASSWORD;

export const DEFAULT_EMAIL =
  process.env.NODE_ENV === 'production'
    ? ''
    : process.env.REACT_APP_DEFAULT_EMAIL;

// Load states
export const LOAD_STATES = {
  PENDING: 'pending',
  LOADING: 'loading',
  DONE: 'done',
  ERROR: 'error',
  NOT_LOAD: 'not_load',
};

// Token
export const AUTH_TOKEN = {
  NAME: 'boco_token',
  EXPIRES: 'boco_token_expires_in',
  REFRESH: 'boco_token_refresh',
  USER_ID: 'boco_user_id',
};

// RegExp
// TODO: сделать здесь только регэксп а не функцию - заменить где используется!!!!
export const isValidEmail = value =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
export const checkNameRegexp = /^[a-zа-я][a-zа-я\s]*$/i;
