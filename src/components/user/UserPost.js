import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LinkImage from '../../images/defaults/link.png';

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
        <div className="media-left">
          <a href={(post.image !== undefined && post.image !== '') ? post.image : post.url} rel="noopener noreferrer" target="_blank">
            <figure className="image is-128x128 center-image">
              <img
                src={(post.image !== undefined && post.image !== '') ? post.image : LinkImage}
                alt=""
              />
            </figure>
          </a>
        </div>
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