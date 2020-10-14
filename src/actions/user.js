import {
  GET_USER
} from './types';
import firebase from '../firebase';
import db from '../db';

export const fetchUsers = () => async dispatch => {
  try {

    dispatch({
      type: GET_USER
    });
  } catch (error) {
    console.error(error);
  }
}

export const login = () => async dispatch => {
  // Sign in with Firebase Auth
  const provider = new firebase.auth.GoogleAuthProvider();
  const { user } = await firebase.auth().signInWithPopup(provider);
  
  // Set up the user
  const setUser = {
    name: user.displayName,
    id: user.uid,
    image: user.photoURL,
    created_at: firebase.firestore.FieldValue.serverTimestamp()
  }

  // POST the db
  db.collection('users').doc(setUser.id).set(setUser);

  // Then send it to Redux
  dispatch({
    type: GET_USER,
    payload: setUser
  });
}