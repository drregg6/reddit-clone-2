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
    <div className="column post-column">
      <div className="card">
        <div className="card-header">
          <p className="is-capitalized card-header-title">
            <Link to={`/r/${subreddit.name}`}>{subreddit.name}</Link>
          </p>
        </div>
        <div className="card-image">
          <figure className="image is-4by3">
            <a href={aHref} rel="noopener noreferrer" target="_blank">
              <img
                src={imageSrc}
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