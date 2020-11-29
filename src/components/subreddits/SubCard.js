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
  let aHref;
  if (post.image !== '') {
    imageSrc = post.image;
    aHref = post.image;
  } else if (post.fileRef !== '') {
    imageSrc = post.fileRef;
    aHref = post.fileRef;
  } else if (post.url !== '') {
    imageSrc = LinkImage;
    aHref = post.url;
  } else {
    imageSrc = SpeechBubble;
    aHref = `/r/${subreddit.name}/${post.id}`;
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
            <div className="media-left align-center">
              <a href={aHref} rel="noopener noreferrer" target="_blank">
                <figure className="image is-128x128 center-image border-image">
                    <img
                      src={imageSrc}
                      alt=""
                    />
                </figure>
              </a>
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