import axios from 'axios';

const BASE_URL = window.location.origin;

export const signIn = (user, password) => {
  return axios.post(`${BASE_URL}/api/login/index.php`, {
    user,
    password,
  });
};
