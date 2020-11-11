import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import commentTimeFormatter from '../../utils/commentTimeFormatter';

import Container from '../layout/Container';
import UpdateForm from './UpdateForm';
import CommentForm from './CommentForm';
import PostComment from './PostComment';

import { connect } from 'react-redux';
import { fetchPost } from '../../actions/posts';
import { fetchSubreddits } from '../../actions/subreddits';
import { fetchPostComments } from '../../actions/comments';
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
  upvote,
  downvote,
  votes: { vote },
  posts: { post },
  users: { users },
  auth: { currentUser },
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

  const fetchSubredditByName = (sub_name) => {
    return subreddits.filter(subreddit => subreddit.name === sub_name)[0];
  }
  let subreddit_id = '';
  if (subreddits.length !== 0) {
    subreddit_id = fetchSubredditByName(name).id;
  }

  const fetchAuthorById = user_id => {
    return users.filter(user => user.id === user_id)[0];
  }
  let author = {
    name: 'Anonymous',
    image: 'https://bulma.io/images/placeholders/96x96.png',
    id: 'rand0mnumb3rgen3r4t0r'
  };
  if (post !== null) {
    author = fetchAuthorById(post.user_id);
  }

  return (
    <section>
      <div className="hero is-warning">
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
        <div className="hero-body has-text-centered">
          {
            (post !== null && post.url) && (
              <figure className="image" style={{ margin: '0 auto', width: '35vw' }}>
                <img
                  src={post.url}
                  alt=""
                />
              </figure>
            )
          }
          <h1 className="title">
            { post !== null && post.title }
          </h1>
          {
            (post !== null && post.desc) && (
              <h2 className="subtitle">
                { post.desc }
              </h2>
            )
          }
        </div>
        <div className="hero-foot mb-3">
          <div className="level is-size-6">
            <div className="level-item has-text-centered">
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
            <div className="level-item has-text-centered">
              <p>
                Created: { post !== null && commentTimeFormatter(post.created_at.seconds) }
              </p>
            </div>
            <div className="level-item has-text-centered">
              <p>
                Updated: { post !== null && commentTimeFormatter(post.updated_at.seconds) }
              </p>
            </div>
          </div>
        </div>
      </div>
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
                  return (
                    <PostComment
                      comment={comment}
                      comments={comments}
                      currentUser={currentUser}
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
  subreddits: PropTypes.object,
  comments: PropTypes.object,
  posts: PropTypes.object,
  votes: PropTypes.object,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
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
    upvote,
    downvote
  }
)(Post);