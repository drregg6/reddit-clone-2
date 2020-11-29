import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dateFormatter from '../../utils/dateFormatter';
import getPreviewText from '../../utils/getTextPreview';

import LinkImage from '../../images/defaults/link.png';
import SpeechBubble from '../../images/defaults/speech-bubble.jpg';
import MarkedText from '../layout/MarkedText';
import Votes from './Votes';

const PostCard = ({
  deletePost,
  currentUser,
  subreddit,
  post,
  author,
  postVotes
}) => {
  const {
    voteId,
    userUpvotes,
    userDownvotes,
    votes
  } = postVotes;
  const vote_id = voteId;
  const post_id = post.id;
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
    aHref = `/r/${subreddit}/${post.id}`;
  }

  return (
    <div className="media" key={post_id}>
      <div className="media-left align-center">
        <Votes
          voteId={vote_id}
          postId={post_id}
          votes={votes}
          userUpvotes={userUpvotes}
          userDownvotes={userDownvotes}
          currentUser={currentUser}
        />
      </div>
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
      <div className="media-content post-content">
        <p className="has-text-weight-bold">
          <Link to={`/r/${subreddit}/${post_id}`}>{post.title}</Link>
        </p>
        {
          post.desc !== '' && (
            <div className="mb-3">
              <MarkedText>{getPreviewText(post.desc)}</MarkedText>
            </div>
          )
        }
        <div className="level is-size-7">
          <div className="level-right">
            <div className="level-item">
              <span className="has-text-weight-bold mr-1">Updated:</span> { dateFormatter(post.updated_at.seconds) }
            </div>
            <div className="level-item">
              <figure className="image is-24x24 mr-2 mb-0">
                <img className="is-rounded" src={author.image} alt="" />
              </figure>
              <Link to={`/u/${author.id}`}>{ author.name }</Link>
            </div>
          </div>
        </div>
      </div>
      {
        post.user_id === currentUser.id && (
          <div className="media-right">
            <button className="delete" onClick={() => deletePost(post_id, vote_id)}>X</button>
          </div>
        )
      }
    </div>
  )
}

PostCard.propTypes = {
  deletePost: PropTypes.func,
  post: PropTypes.object,
  author: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  postVotes: PropTypes.object.isRequired,
}

export default PostCard;