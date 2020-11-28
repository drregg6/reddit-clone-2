import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import getTextPreview from '../../utils/getTextPreview';

import MarkedText from '../layout/MarkedText';
import LinkImage from '../../images/defaults/link.png';
import SpeechBubble from '../../images/defaults/speech-bubble.jpg';

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
            <a href={(post.image !== undefined && post.image !== '') ? post.image : post.url} rel="noopener noreferrer" target="_blank">
              <img
                src={(post.image !== undefined && post.image !== '') ? post.image : (post.url !== undefined && post.url !== '') ? LinkImage : SpeechBubble}
                alt=""
              />
            </a>
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
                <div className="mb-3">
                  <MarkedText>{getTextPreview(post.desc)}</MarkedText>
                </div>
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