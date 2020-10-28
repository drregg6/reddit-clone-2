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

export const fetchPosts = (subreddit) => async dispatch => {
  try {
    let payload = [];
    const res = await db.collection('posts').where('subreddit_id', '==', subreddit).get();
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
  // generate an auto id
  let doc = db.collection('posts').doc();
  console.log(doc.id);

  // create the payload object and populate with important data
  let payload = {...newPost};
  payload.id = doc.id;
  payload.created_at = firebase.firestore.FieldValue.serverTimestamp();
  payload.updated_at = firebase.firestore.FieldValue.serverTimestamp();
  payload.user_id = firebase.auth().currentUser.uid;

  try {
    // create a post in firebase with the id created
    await db.collection('posts').doc(payload.id).set( payload );

    // add it to the redux store
    dispatch({
      type: CREATE_POST,
      payload
    });
  } catch (error) {
    console.error(error.message);
  }
}