import {
  LOGIN_USER,
  LOGOUT_USER,
  GET_USER,
  LOGIN_FAIL
} from './types';
import firebase from '../firebase';
import db from '../db';

export const getUser = (user) => async dispatch => {
  dispatch({
    type: GET_USER,
    payload: user
  });
}

export const userError = () => dispatch => {
  dispatch({ type: LOGIN_FAIL })
}

export const login = () => async dispatch => {
  try {
    // Sign in with Firebase Auth
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await firebase.auth().signInWithPopup(provider);
    
    // Set up the user
    const payload = {
      name: user.displayName,
      id: user.uid,
      image: user.photoURL
    }
    const newUser = {
      ...payload,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    }
    // POST the db
    db.collection('users').doc(newUser.id).set(newUser);

    // Then send it to Redux
    dispatch({
      type: LOGIN_USER,
      payload
    });
  } catch (error) {
    console.error(error.message);
  }
}

export const logout = () => async dispatch => {
  try {
    await firebase.auth().signOut();
    dispatch({
      type: LOGOUT_USER
    });
  } catch (error) {
    console.error(error.message);
  }
}