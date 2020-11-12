import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SubMobileCard = ({
  subreddit,
  post
}) => {
  return (
    <div className="column post-column">
      <div className="card">
        <div className="card-header">
          <p className="is-capitalized card-header-title">
            <Link to={`/r/${subreddit.name}`}>{subreddit.name}</Link>
          </p>
        </div>
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src={post.image !== undefined && post.image !== '' ? post.image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/VisualEditor_-_Icon_-_Link.svg/768px-VisualEditor_-_Icon_-_Link.svg.png'}
              alt=""
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <p className="title is-6">
              <Link to={`/r/${subreddit.name}/${post.id}`}>
                {post.title}
              </Link>
            </p>
            {
              post.desc && (
                <p>
                  {post.desc}
                </p>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

SubMobileCard.propTypes = {
  subreddit: PropTypes.object,
  post: PropTypes.object,
}

export default SubMobileCard;