import {
  GET_POSTS,
  GET_POST,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  CLEAR_POST
} from './types';
import db from '../db';
import firebase from '../firebase';

export const fetchPosts = () => async dispatch => {
  try {
    let payload = [];
    const res = await db.doc('posts').get();
    res.forEach(post => {
      payload.push(post.data());
    });
    dispatch({
      type: GET_POSTS,
      payload
    });
  } catch (error) {
    console.error(error.message);
  }
}

export const createPost = (newPost) => async dispatch => {
  let payload = {...newPost};
  payload.created_at = firebase.firestore.FieldValue.serverTimestamp();
  payload.updated_at = firebase.firestore.FieldValue.serverTimestamp();
  payload.user_id = firebase.auth().currentUser.uid;
  console.log(payload);
  try {
    
  } catch (error) {
    console.error(error.message);
  }
}