import { LOGIN, USERS } from './services/APIEndpoints';
import API from './services/APIService'; // axios

export const login = params => API.post(LOGIN, { ...params });

export const getUsersList = () => API.get(USERS);
export const deleteUserById = id => API.delete(`${USERS}${id}`);
