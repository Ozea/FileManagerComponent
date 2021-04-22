import { signIn, signOut } from 'src/services/session';
import { resetAuthToken } from 'src/utils/token';
import { LOGIN, LOGOUT } from './sessionTypes';

export const login = (user, password) => dispatch => {
  return new Promise((resolve, reject) => {
    signIn(user, password).then((response) => {
      const { error, token, panel } = response.data;
      window.GLOBAL.App.topPanel = panel;
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

export const logout = () => dispatch => {
  return new Promise((resolve, reject) => {
    signOut().then((response) => {
      const { logout_response } = response.data;

      if (logout_response) {
        resetAuthToken();
        resolve();
        return dispatch({
          type: LOGOUT,
          value: {
            token: '',
            error: ''
          },
        });
      } else {
        console.error(`Error while signing out: ${logout_response}`);
      }
    }, (error) => {
      console.error(error);
      reject();
    });
  });
}

export const setToken = token => {
  return {
    type: LOGIN,
    value: {
      token,
      error: ''
    }
  }
}
