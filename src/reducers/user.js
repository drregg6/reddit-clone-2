import {
  GET_USER
} from '../actions/types';

const initialState = {
  user: {},
  isLoggedIn: false,
  isLoading: true
}

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case GET_USER:
      return {
        ...state,
        user: {...payload},
        isLoggedIn: true,
        isLoading: false
      };
    default:
      return state;
  }
}