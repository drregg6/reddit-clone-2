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
  let postsDoc = db.collection('posts').postsD();
  let votesDoc = db.collection('votes').doc();
  console.log(votesDoc.id);

  // create the payload object and populate with important data
  let postsPayload = {...newPost};
  postsPayload.id = postsDoc.id;
  postsPayload.created_at = firebase.firestore.FieldValue.serverTimestamp();
  postsPayload.updated_at = firebase.firestore.FieldValue.serverTimestamp();
  postsPayload.user_id = firebase.auth().currentUser.uid;

  // create votes collection when a post is created
  let votesPayload = { vote: 1 };
  votesPayload.id = votesDoc.id;
  votesPayload.created_at = firebase.firestore.FieldValue.serverTimestamp();
  votesPayload.updated_at = firebase.firestore.FieldValue.serverTimestamp();
  votesPayload.user_id = [...firebase.auth().currentUser.uid];
  votesPayload.post_id = postsPayload.id;

  try {
    // create a post in firebase with the id created
    await db.collection('posts').doc(postsPayload.id).set( postsPayload );

    // create a vote in firebase with the id created
    await db.collection('votes').doc(votesPayload.id).set( votesPayload );

    // add it to the redux store
    dispatch({
      type: CREATE_POST,
      payload: postsPayload
    });
  } catch (error) {
    console.error(error.message);
  }
}



export const deletePost = (id) => async dispatch => {
  try {
    await db.collection('posts').doc(id).delete();
    dispatch({
      type: DELETE_POST,
      payload: id
    });
  } catch (error) {
    console.error(error.message);
  }
}