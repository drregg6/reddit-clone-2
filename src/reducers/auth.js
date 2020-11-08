import {
  LOGIN_USER,
  LOGOUT_USER,
  GET_CURRENT_USER,
  LOGIN_FAIL
} from '../actions/types';

const initialState = {
  currentUser: {},
  isLoggedIn: false,
  isLoading: true
}

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case LOGIN_USER:
    case GET_CURRENT_USER:
      return {
        ...state,
        currentUser: {...payload},
        isLoggedIn: true,
        isLoading: false
      };
    case LOGOUT_USER:
    case LOGIN_FAIL:
      return {
        ...state,
        currentUser: {},
        isLoggedIn: false,
        isLoading: false
      }
    default:
      return state;
  }
}