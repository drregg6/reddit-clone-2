import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserPost = ({
  post,
  user,
  subreddit,
  currentUser,
  vote_id,
  deletePost
}) => {
  return (
    <div key={post.id} className="box">
      <div className="media">
      { 
          post.url && (
            <div className="media-left">
              <figure className="image is-128x128">
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
        </div>
        {
          (user !== null && user.id === currentUser.id) && (
            <div className="media-right">
              <button
                className="delete"
                onClick={() => deletePost(post.id, vote_id)}
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
  subreddit: PropTypes.string,
  currentUser: PropTypes.object,
  vote_id: PropTypes.string,
  deletePost: PropTypes.func,
}

export default UserPost;