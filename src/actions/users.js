import {
  GET_USERS
} from './types';
import db from '../db';

export const fetchUsers = () => async dispatch => {
  let payload = [];
  try {
    const res = await db.collection('users').get();
    res.forEach(doc => {
      payload.push(doc.data());
    });
    dispatch({
      type: GET_USERS,
      payload
    });
  } catch (error) {
    console.error(error);
  }
}