import axios from 'axios';
import history from '../../history';
// import Cookies from 'js-cookie';
// import { COOKIE_NAME_AUTH_TOKEN } from 'config/constants';
import logOutService from './logOutService';
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

// APIService.interceptors.response.use(null, logOutService);

// Add a response interceptor
APIService.interceptors.response.use(
  response => response,
  error => {
    // catches if the session ended!
    // if ( error.response.data.token.KEY == 'ERR_EXPIRED_TOKEN') {
    //   console.log("EXPIRED TOKEN!");
    //   localStorage.clear();
    //   store.dispatch({ type: UNAUTH_USER });
    // }
    if (error && error.response && error.response.status === 401) {
      localStorage.clear();
      history.push('/login');
    }
    return Promise.reject(error);
  },
);

// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.patch['Content-Type'] = 'application/json';
// axios.defaults.headers.put['Content-Type'] = 'application/json';
// // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
// if (token) {
//   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }


export default APIService;




// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const saveToken = data => {
  if (!data.token) return;
  localStorage.setItem(AUTH_TOKEN.NAME, data.token);
  localStorage.setItem(AUTH_TOKEN.REFRESH, data.refreshToken);
  localStorage.setItem(AUTH_TOKEN.EXPIRES, data.expiresIn);
  localStorage.setItem('id', data.id);
  // APIService.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  APIService.defaults.headers.common['x-auth-token'] = `${data.token}`;
};

export const saveUserRole = role => {
  if (!role) return;
  localStorage.setItem('role', role);
};

export const clearToken = () => {
  localStorage.setItem(AUTH_TOKEN.NAME, undefined);
  localStorage.setItem(AUTH_TOKEN.REFRESH, undefined);
  localStorage.setItem(AUTH_TOKEN.EXPIRES, undefined);
  // localStorage.setItem('id', undefined);
  APIService.defaults.headers.common['x-auth-token'] = undefined;
};
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



//
// export default () => {
//   const token = localStorage.getItem('token');
//   const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;
//
//   axios.interceptors.request.use(
//     async config => {
//       if (localStorage.getItem('expires_in') * 1000 >=  Date.now()) return config;
//       const refreshToken = localStorage.getItem('refreshToken');
//       if (!refreshToken) return config;
//
//       const result = await fetch(baseUrl + '/user/token', {
//         method: 'post',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ token: refreshToken })
//       });
//
//       const newAuthData = await result.json();
//
//       saveToken(newAuthData);
//       if (newAuthData.token) config.headers.Authorization = `Bearer ${newAuthData.token}`;
//
//       return config;
//     },
//     error => Promise.reject(error)
//   );
//
//   axios.defaults.baseURL = baseUrl;
//
//   // Add a response interceptor
//   axios.interceptors.response.use((response) => {
//     return response;
//   }, (error) => {
//     //catches if the session ended!
//     // if ( error.response.data.token.KEY == 'ERR_EXPIRED_TOKEN') {
//     //   console.log("EXPIRED TOKEN!");
//     //   localStorage.clear();
//     //   store.dispatch({ type: UNAUTH_USER });
//     // }
//     if (error && error.response && error.response.status === 401) {
//       localStorage.clear();
//       history.push('/login');
//     }
//     return Promise.reject(error);
//   });
//   axios.defaults.headers.post['Content-Type'] = 'application/json';
//   axios.defaults.headers.patch['Content-Type'] = 'application/json';
//   axios.defaults.headers.put['Content-Type'] = 'application/json';
//   // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
//   if (token) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   }
// };
