import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LinkImage from '../../images/defaults/link.png';
import SpeechBubble from '../../images/defaults/speech-bubble.jpg';

const UserMobileCard = ({
  post,
  user,
  subreddit,
  currentUser,
  vote,
  deletePost
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
    <div className="card mobile-card">
      {
        post !== undefined && (
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
        )
      }
      <div className="card-content">
        <p className="mt-0 mb-0">
          {subreddit !== undefined && <Link to={`/r/${subreddit.name}/${post.id}`}>{post.title}</Link>}
        </p>
        {
          post.desc && (
            <p className="mt-0 mb-0">
              {post.desc}
            </p>
          )
        }
      </div>
      {
        (user !== null && user.id === currentUser.id) && (
          <button className="delete-button" onClick={() => deletePost(post.id, vote.id)}>X</button>
        )
      }
    </div>
  )
}

UserMobileCard.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
  subreddit: PropTypes.object,
  currentUser: PropTypes.object,
  vote: PropTypes.object,
  deletePost: PropTypes.func,
}

export default UserMobileCard;