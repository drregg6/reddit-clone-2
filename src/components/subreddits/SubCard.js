import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-96x96">
                <img src={ post.url ? post.url : "https://bulma.io/images/placeholders/96x96.png" } alt="" />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">
                <Link to={`/r/${subreddit.name}/${post.id}`}>{post.title}</Link>
              </p>
            </div>
          </div>
          {post.desc && (
            <div class="content">
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