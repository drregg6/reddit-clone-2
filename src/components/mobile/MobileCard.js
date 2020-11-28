import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dateFormatter from '../../utils/dateFormatter';
import getDocById from '../../utils/getDocById';
import getTextPreview from '../../utils/getTextPreview';
import LinkImage from '../../images/defaults/link.png';
import SpeechBubble from '../../images/defaults/speech-bubble.jpg';

import MarkedText from '../layout/MarkedText';

import { connect } from 'react-redux';
import { upvote, downvote } from '../../actions/votes';
import { deletePost } from '../../actions/posts';

const MobileCard = ({
  post,
  users,
  votes,
  currentUser,
  subreddits
}) => {
  const author = getDocById(users, post.user_id);
  const subreddit = getDocById(subreddits, post.subreddit_id);
  let vote = getDocById(votes, post.id);

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
    <div className="my-6 card mobile-card">
      <div className="card-image">
        <figure className="image is-4by3">
          <a href={(post.image !== undefined && post.image !== '') ? post.image : post.url} rel="noopener noreferrer" target="_blank">
            <img
              src={imageSrc}
              alt=""
            />
          </a>
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              {author !== undefined && <img src={author.image} alt="" />}
            </figure>
          </div>
          <div className="media-content">
            <Link to={`/r/${subreddit.name}/${post.id}`}>
              <p className="title is-6">{post.title}</p>
            </Link>
            {
              author !== undefined && (
                <Link to={`/u/${author.id}`}>
                  <p className="subtitle is-7">{author.name}</p>
                </Link>
              )
            }
          </div>
        </div>

        <div className="content">
          {
            post.desc && (
              <div className="mb-3">
                <MarkedText>{getTextPreview(post.desc)}</MarkedText>
              </div>
            )
          }
          <p className="is-size-7 mb-0">
            { subreddit && <Link to={`/r/${subreddit.name}`}>{subreddit.name}</Link> }
          </p>
          <p className="is-size-7 mt-0 mb-0">
            Created { dateFormatter(post.created_at.seconds) }
          </p>
          <p className="is-size-7 mt-0">
            Updated { dateFormatter(post.updated_at.seconds) }
          </p>
        </div>
      </div>
      {
        currentUser.id === post.user_id && (
          <button className="delete-button" onClick={() => deletePost(post.id, vote.id)}>X</button>
        )
      }
      {
        vote !== undefined && (
          <div className="card-footer">
            <div className="card-footer-item">
              <button
                className={`button is-success is-small ${vote.user_upvotes.indexOf(currentUser.id) !== -1 && 'is-light'}`}
                disabled={Object.entries(currentUser).length === 0}
                onClick={() => upvote(vote.id, post.id, currentUser.id)}
              >
                Upvote
              </button>
            </div>
            <div className="card-footer-item">
              <span className="vote-amount my-1">{ vote.votes }</span>
            </div>
            <div className="card-footer-item">
              <button
                className={`button is-danger is-small ${vote.user_downvotes.indexOf(currentUser.id) !== -1 && 'is-light'}`}
                disabled={Object.entries(currentUser).length === 0}
                onClick={() => downvote(vote.id, post.id, currentUser.id)}
              >
                Downvote
              </button>
            </div>
          </div>
        )
      }
    </div>
  )
}

MobileCard.propTypes = {
  post: PropTypes.object,
  users: PropTypes.array,
  subreddits: PropTypes.array,
  votes: PropTypes.array,
  currentUser: PropTypes.object,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
}

export default connect(
  null,
  { upvote, downvote, deletePost }
)(MobileCard);