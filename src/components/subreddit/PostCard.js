import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dateFormatter from '../../utils/dateFormatter';

import Votes from './Votes';

const PostCard = ({
  deletePost,
  currentUser,
  subreddit,
  post_id,
  user_id,
  url,
  title,
  desc,
  updated_at,
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
  return (
    <div className="media" key={post_id}>
      <div className="media-left">
        <Votes
          voteId={voteId}
          postId={post_id}
          votes={votes}
          userUpvotes={userUpvotes}
          userDownvotes={userDownvotes}
          currentUser={currentUser}
        />
      </div>
      {
        url !== '' && (
          <div className="media-left" style={{ alignSelf: 'center' }}>
            <figure className="image is-64x64">
              <a href={url} target="_blank" rel="noopener noreferrer">
                <img
                  src={url}
                  alt=""
                />
              </a>
            </figure>
          </div>
        )
      }
      <div className="media-content post-content">
        <p className="has-text-weight-bold">
          <Link to={`/r/${subreddit}/${post_id}`}>{title}</Link>
        </p>
        <p>{desc}</p>
        <div className="level is-size-7">
          <div className="level-right">
            <div className="level-item">
              <span className="has-text-weight-bold mr-1">Updated:</span> { dateFormatter(updated_at.seconds) }
            </div>
            <div className="level-item">
              <figure className="image is-24x24 mr-2">
                <img className="is-rounded" src={author.image} alt="" />
              </figure>
              { author.name }
            </div>
          </div>
        </div>
      </div>
      {
        user_id === currentUser.id && (
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
  post_id: PropTypes.string.isRequired,
  user_id: PropTypes.string.isRequired,
  subreddit: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  postVotes: PropTypes.object.isRequired,
}

export default PostCard;