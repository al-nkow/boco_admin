export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_DOMAIN_PROD
    : process.env.REACT_APP_API_DOMAIN_DEV;

// Load states
export const LOAD_STATES = {
  PENDING: 'pending',
  DONE: 'done',
  ERROR: 'error',
  NOT_LOAD: 'not_load',
};

// Token
export const AUTH_TOKEN = {
  NAME: 'boco_token',
  EXPIRES: 'boco_token_expires_in',
  REFRESH: 'boco_token_refresh',
};
