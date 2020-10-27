import {
  LOGIN_USER,
  LOGOUT_USER,
  GET_USER,
  LOGIN_FAIL
} from '../actions/types';

const initialState = {
  user: {},
  isLoggedIn: false,
  isLoading: true
}

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case LOGIN_USER:
    case GET_USER:
      return {
        ...state,
        user: {...payload},
        isLoggedIn: true,
        isLoading: false
      };
    case LOGOUT_USER:
    case LOGIN_FAIL:
      return {
        ...state,
        user: {},
        isLoggedIn: false,
        isLoading: false
      }
    default:
      return state;
  }
}