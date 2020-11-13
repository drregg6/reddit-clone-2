import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import commentTimeFormatter from '../../utils/commentTimeFormatter';
import getDocById from '../../utils/getDocById';
import LinkImage from '../../images/defaults/link.png';

import Container from '../layout/Container';
import Hero from '../layout/Hero';
import UpdateForm from './UpdateForm';
import CommentForm from './CommentForm';
import PostComment from './PostComment';
import MobileComment from '../mobile/MobileComment';

import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../../actions/posts';
import { fetchSubreddits } from '../../actions/subreddits';
import {
  fetchPostComments,
  addComment
} from '../../actions/comments';
import { fetchUsers } from '../../actions/users';
import {
  fetchPostVote,
  upvote, 
  downvote
} from '../../actions/votes';

const Post = ({
  fetchPost,
  fetchUsers,
  fetchPostVote,
  fetchSubreddits,
  fetchPostComments,
  addComment,
  deletePost,
  upvote,
  downvote,
  votes: { vote },
  posts: { post },
  users: { users },
  auth: { currentUser, isLoggedIn },
  subreddits: { subreddits },
  comments: { comments }
}) => {
  const { post_id, name } = useParams();
  useEffect(() => {
    fetchPost(post_id);
    fetchSubreddits();
    fetchPostComments(post_id);
    fetchUsers();
    fetchPostVote(post_id);
  }, [
    fetchSubreddits,
    fetchPostComments,
    fetchPostVote,
    fetchUsers,
    fetchPost,
    post_id
  ]);
  const [ showForm, toggleShowForm ] = useState( false );
  
  let subreddit_id;
  if (subreddits.length !== 0) {
    subreddit_id = getDocById(subreddits, name, 'name').id;
  }

  let author = {
    name: 'Anonymous',
    url: '',
    image: 'https://bulma.io/images/placeholders/96x96.png',
    id: 'rand0mnumb3rgen3r4t0r'
  };
  if (post !== null) {
    author = getDocById(users, post.user_id);
  }

  return (
    <section>
      <Hero medium color='light'>
        <div className="hero-head mt-3" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <button
          className={`button is-success is-small ${vote !== null && vote.user_upvotes.indexOf(currentUser.id) !== -1 && 'is-light'}`}
          disabled={Object.entries(currentUser).length === 0}
          onClick={() => upvote(vote.id, post_id, currentUser.id, true)}
        >
          Upvote
        </button>
        { vote !== null && <span className="mx-3">{vote.votes}</span>}
          <button
            className={`button is-danger is-small ${vote !== null && vote.user_downvotes.indexOf(currentUser.id) !== -1 && 'is-light'}`}
            disabled={Object.entries(currentUser).length === 0}
            onClick={() => downvote(vote.id, post_id, currentUser.id, true)}
          >
            Downvote
          </button>
        </div>
        <div className="hero-body post-hero-body">
          {
            post !== null && (
                <figure className="image post-image">
                <a href={(post.image !== undefined && post.image !== '') ? post.image : post.url} rel="noopener noreferrer" target="_blank">
                  <img
                    src={(post.image !== undefined && post.image !== '') ? post.image : LinkImage}
                    alt=""
                  />
                </a>
              </figure>
            )
          }
          <h1 className="title has-text-centered">
            { post !== null && post.title }
          </h1>
          {
            (post !== null && post.desc) && (
              <h2 className="subtitle is-size-5">
                { post.desc }
              </h2>
            )
          }
        </div>
        <div className="hero-foot mb-3">
          <div className="level is-size-7">
            <div className="level-item has-text-centered mb-0">
              <figure className="image is-24x24 mr-2" style={{ marginBottom: 0 }}>
                <img
                  className="is-rounded"
                  src={author.image}
                  alt=""
                />
              </figure>
              <Link to={`/u/${author.id}`}>
                <p>
                  {author.name}
                </p>
              </Link>
            </div>
            <div className="level-item has-text-centered mt-0 mb-0">
              <p>
                Created: { post !== null && commentTimeFormatter(post.created_at.seconds) }
              </p>
            </div>
            <div className="level-item has-text-centered mt-0">
              <p>
                Updated: { post !== null && commentTimeFormatter(post.updated_at.seconds) }
              </p>
            </div>
            {
              (post !== null && currentUser.id === post.user_id) && (
                <div className="level-item has-text-centered mb-0">
                  <button className="button is-small is-danger" onClick={() => deletePost(post.id, vote.id)}>Delete Post</button>
                </div>
              )
            }
          </div>
        </div>
      </Hero>
      <Container>
        {
          (post !== null && currentUser.id === post.user_id) && (
            <button
              className="button is-success"
              onClick={() => toggleShowForm(!showForm)}
            >
              {showForm ? 'Close Form' : 'Edit Post'}
            </button>
          )
        }
        {
          (showForm && post !== null) && (
            <UpdateForm
              oldImage={post.image}
              oldTitle={post.title}
              oldDesc={post.desc}
              oldUrl={post.url}
              post_id={post.id}
              toggleShowForm={toggleShowForm}
            />
          )
        }
        <div className="comments">
          {
            (comments.length !== 0) && (
              comments.map(comment => {
                if (comment.parent_id === null) {
                  return isMobile ? (
                    <MobileComment
                      key={comment.id}
                      users={users}
                      comments={comments}
                      comment={comment}
                      currentUser={currentUser}
                      isLoggedIn={isLoggedIn}
                    />
                  ) : (
                    <PostComment
                      comment={comment}
                      comments={comments}
                      currentUser={currentUser}
                      isLoggedIn={isLoggedIn}
                      users={users}
                      key={comment.id}
                    />
                  )
                }
              })
            )
          }
          <div className="mt-3 comment-form">
            <h2 className="subtitle">Add a Comment</h2>
            <CommentForm
              addComment={addComment}
              currentUser={currentUser}
              post_id={post_id}
              name={name}
              subreddit_id={subreddit_id}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

Post.propTypes = {
  fetchSubreddits: PropTypes.func.isRequired,
  fetchPost: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  fetchPostVote: PropTypes.func.isRequired,
  fetchPostComments: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  subreddits: PropTypes.object,
  comments: PropTypes.object,
  posts: PropTypes.object,
  votes: PropTypes.object,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  subreddits: state.subreddits,
  comments: state.comments,
  users: state.users,
  posts: state.posts,
  auth: state.auth,
  votes: state.votes
})

export default connect(
  mapStateToProps,
  {
    fetchPost,
    fetchUsers,
    fetchPostVote,
    fetchSubreddits,
    fetchPostComments,
    addComment,
    deletePost,
    upvote,
    downvote
  }
)(Post);