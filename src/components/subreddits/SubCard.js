import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import getTextPreview from '../../utils/getTextPreview';

import LinkImage from '../../images/defaults/link.png';
import SpeechBubble from '../../images/defaults/speech-bubble.jpg';
import MarkedText from '../layout/MarkedText';

const SubCard = ({
  subreddit,
  post
}) => {
  let imageSrc;
  if (post.image !== '') {
    imageSrc = post.image;
  } else if (post.fileRef !== '') {
    imageSrc = post.fileRef;
  } else if (post.url !== '') {
    imageSrc = LinkImage;
  } else {
    imageSrc = SpeechBubble;
  }
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
                    src={imageSrc}
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
              <MarkedText>{getTextPreview(post.desc)}</MarkedText>
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