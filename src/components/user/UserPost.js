import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserPost = ({
  post,
  user,
  subreddit,
  currentUser,
  vote,
  deletePost
}) => {
  return (
    <div className="box">
      <div className="media">
      { 
          post.url && (
            <div className="media-left">
              <figure className="image is-64x64">
                <img
                  src={ post.url }
                  alt={ post.title }
                />
              </figure>
            </div>
          )
        }
        <div className="media-content">
          <p className="has-text-weight-bold">
            { subreddit !== undefined && <Link to={`/r/${subreddit.name}/${post.id}`}>{post.title}</Link> }
          </p>
          {
            post.desc && (
              <p>
                {post.desc}
              </p>
            )
          }
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <p className="is-size-7">
                  { subreddit !== undefined && <Link to={`/r/${subreddit.name}`}>{subreddit.name}</Link> }
                </p>
              </div>
            </div>
          </div>
        </div>
        {
          (user !== null && user.id === currentUser.id) && (
            <div className="media-right">
              <button
                className="delete"
                onClick={() => deletePost(post.id, vote.id)}
              >
                X
              </button>
            </div>
          )
        }
      </div>
    </div>
  )
}

UserPost.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
  subreddit: PropTypes.object,
  currentUser: PropTypes.object,
  vote: PropTypes.object,
  deletePost: PropTypes.func,
}

export default UserPost;