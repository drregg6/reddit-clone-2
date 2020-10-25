import {
  LOGIN_USER,
  LOGOUT_USER
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
      return {
        ...state,
        user: {...payload},
        isLoggedIn: true,
        isLoading: false
      };
    case LOGOUT_USER:
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