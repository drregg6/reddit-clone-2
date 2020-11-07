import {
  GET_POSTS,
  GET_POST,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  CLEAR_POST,
  ADD_VOTES,
  DELETE_VOTE
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



export const fetchPost = (post_id) => async dispatch => {
  dispatch({ type: CLEAR_POST });
  try {
    let payload = {};
    await db.collection('posts').doc(post_id).get().then(doc => {
      payload = doc.data();
    });

    dispatch({
      type: GET_POST,
      payload
    })
  } catch (error) {
    console.error(error.message);
  }
}



export const createPost = (newPost) => async dispatch => {
  // generate an auto id
  let postsDoc = db.collection('posts').doc();
  let votesDoc = db.collection('votes').doc();
  console.log(votesDoc.id);

  // create the payload object and populate with important data
  let postsPayload = {...newPost};
  postsPayload.id = postsDoc.id;
  postsPayload.created_at = firebase.firestore.FieldValue.serverTimestamp();
  postsPayload.updated_at = firebase.firestore.FieldValue.serverTimestamp();
  postsPayload.user_id = firebase.auth().currentUser.uid;

  // create votes collection when a post is created
  let votesPayload = { votes: 1 };
  votesPayload.user_upvotes = [];
  votesPayload.user_downvotes = [];
  votesPayload.id = votesDoc.id;
  votesPayload.subreddit_id = postsPayload.subreddit_id;
  votesPayload.updated_at = firebase.firestore.FieldValue.serverTimestamp();
  votesPayload.user_upvotes.push(firebase.auth().currentUser.uid);
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
    dispatch({
      type: ADD_VOTES,
      payload: votesPayload
    })
    dispatch({})
  } catch (error) {
    console.error(error.message);
  }
}



export const updatePost = (body) => async dispatch => {
  console.log(body);
  try {
    dispatch({
      type: UPDATE_POST,
      payload: 'Hello world!'
    });
  } catch (error) {
    console.error(error.message);
  }
}



export const deletePost = (post_id, vote_id) => async dispatch => {
  try {
    // delete the Post doc associated with the id
    await db.collection('posts').doc(post_id).delete();
    dispatch({
      type: DELETE_POST,
      payload: post_id
    });

    // delete the Votes doc associated with posts
    await db.collection('votes').doc(vote_id).delete();
    dispatch({
      type: DELETE_VOTE,
      payload: vote_id
    });
  } catch (error) {
    console.error(error.message);
  }
}