import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
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

const Post = ({
  fetchPost,
  fetchUsers,
  fetchSubreddits,
  fetchPostComments,
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
  }, [
    fetchSubreddits,
    fetchPostComments,
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
      <div className="hero is-info">
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
        <div className="hero-foot">
          <div className="level is-size-6">
            <div className="level-item has-text-centered">
              <figure className="image is-24x24 mr-2" style={{ marginBottom: 0 }}>
                <img
                  className="is-rounded"
                  src={author.image}
                  alt=""
                />
              </figure>
              <p>
                {author.name}
              </p>
            </div>
            <p className="level-item has-text-centered">
              Created: { post !== null && commentTimeFormatter(post.created_at.seconds) }
            </p>
            <p className="level-item has-text-centered">
              Updated: { post !== null && commentTimeFormatter(post.updated_at.seconds) }
            </p>
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
                    />
                  )
                }
              })
            )
          }
          <h2 className="subtitle">Add a Comment</h2>
          <CommentForm
            currentUser={currentUser}
            post_id={post_id}
            name={name}
            subreddit_id={subreddit_id}
          />
        </div>
      </Container>
    </section>
  )
}

Post.propTypes = {
  fetchSubreddits: PropTypes.func.isRequired,
  fetchPost: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  fetchPostComments: PropTypes.func.isRequired,
  subreddits: PropTypes.object,
  comments: PropTypes.object,
  posts: PropTypes.object,
}

const mapStateToProps = state => ({
  subreddits: state.subreddits,
  comments: state.comments,
  users: state.users,
  posts: state.posts,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {
    fetchPost,
    fetchUsers,
    fetchSubreddits,
    fetchPostComments
  }
)(Post);