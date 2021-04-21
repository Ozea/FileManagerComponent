import { signIn } from 'src/services/session';
import { LOGIN, LOGOUT } from './sessionTypes';

export const login = (user, password) => dispatch => {
  return new Promise((resolve, reject) => {
    signIn(user, password).then((response) => {
      const { error, token } = response.data;
      resolve();
      return dispatch({
        type: LOGIN,
        value: {
          token,
          error,
        },
      })
    }, (error) => {
      console.error(error);
      reject();
    });
  });
}

export const logout = () => {
  return {
    type: LOGOUT,
    value: {
      token: '',
      error: ''
    }
  }
}

export const setToken = token => {
  if (token) {
    return {
      type: LOGIN,
      value: {
        token,
        error: ''
      }
    }
  }
}
