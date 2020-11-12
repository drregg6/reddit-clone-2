import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LinkImage from '../../images/defaults/link.png';

const SubCard = ({
  subreddit,
  post
}) => {
  return (
    <div className="column is-4 post-column">
      <div className="card">
        <div className="card-header">
          <p className="is-capitalized card-header-title">
            <Link to={`/r/${subreddit.name}`}>{subreddit.name}</Link>
          </p>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-96x96">
                <a href={(post.image !== undefined && post.image !== '') ? post.image : post.url} rel="noopener noreferrer" target="_blank">
                  <img
                    src={(post.image !== undefined && post.image !== '') ? post.image : LinkImage}
                    alt=""
                  />
                </a>
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">
                <Link to={`/r/${subreddit.name}/${post.id}`}>{post.title}</Link>
              </p>
            </div>
          </div>
          {post.desc && (
            <div className="content">
              {post.desc}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

SubCard.propTypes = {
  subreddit: PropTypes.object,
  post: PropTypes.object,
}

export default SubCard;