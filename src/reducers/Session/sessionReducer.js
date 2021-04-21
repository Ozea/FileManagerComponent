import { LOGIN, LOGOUT } from '../../actions/Session/sessionTypes';

const INITIAL_STATE = {
  token: '',
  error: ''
};

const sessionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.value.token,
        error: action.value.error
      };

    case LOGOUT:
      return {
        ...state,
        token: action.value.token,
        error: action.value.error
      };

    default: return state;
  }
};

export default sessionReducer;