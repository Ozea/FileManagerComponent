import axios from 'axios';

const BASE_URL = window.location.origin;

export const signIn = (user, password) => {
  return axios.post(`${BASE_URL}/api/login/index.php`, {
    user,
    password,
  });
};

export const signOut = () => {
  return axios.get(`${BASE_URL}/api/logout/index.php`);
};
