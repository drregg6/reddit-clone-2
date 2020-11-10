import {
  GET_USERS,
  GET_USER,
  UPDATE_USER,
  CLEAR_USER
} from './types';
import db from '../db';
import firebase from '../firebase';



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


export const fetchUser = (id) => async dispatch => {
  let payload;
  try {
    dispatch({ type: CLEAR_USER });
    await db.collection('users').doc(id).get().then(doc => {
      payload = doc.data();
    });
    dispatch({
      type: GET_USER,
      payload
    });
  } catch (error) {
    console.error(error.message);
  }
}


export const updateUser = (body) => async dispatch => {
  try {
    let updatedUser = {...body};
    updatedUser.updated_at = firebase.firestore.FieldValue.serverTimestamp();
    await db.collection('users').doc(updatedUser.id).update(body);

    dispatch({ type: CLEAR_USER });
    dispatch({
      type: UPDATE_USER,
      payload: updatedUser
    });
  } catch (error) {
    console.error(error.message);
  }
}