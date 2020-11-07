import React from 'react';
import PropTypes from 'prop-types';
import dateFormatter from '../../utils/dateFormatter';
import Votes from './Votes';

import { connect } from 'react-redux';
import { deletePost } from '../../actions/posts';

const PostCard = ({
  deletePost,
  currentUser,
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
    <div className="column is-4 post-column" key={post_id}>
      {
        user_id === currentUser.id && (
        <button
          className="button is-danger delete-button"
          onClick={() => (deletePost(post_id, vote_id))}
        >
          X
        </button>
      )}
      <div className="card">
        {
          (url !== '') && (
            <div className="card-image">
              <figure className="image">
                <img src={ url !== '' ? url : 'https://bulma.io/images/placeholders/96x96.png' } alt={ title } />
              </figure>
            </div>
          )
        }
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img
                  src={ author.image }
                  alt="user avatar"
                />
              </figure>
            </div>
            <div className="media-content">
              {
                url !== '' ? (
                  <p className="title is-4"><a href={`${ url }`} target="_blank" rel="noopener noreferrer">{ title }</a></p>
                ) : (
                  <p className="title is-4">{ title }</p>
                )
              }
              <p className="subtitle is-6">{ author.name }</p>
            </div>
          </div>

          <div className="content">
            { desc && desc }
            <br />
            <time>{ updated_at && dateFormatter(updated_at.seconds) }</time>
          </div>
          <Votes
            voteId={voteId}
            postId={post_id}
            votes={votes}
            userUpvotes={userUpvotes}
            userDownvotes={userDownvotes}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  )
}

PostCard.propTypes = {
  deletePost: PropTypes.func.isRequired,
  post_id: PropTypes.string.isRequired,
  user_id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  postVotes: PropTypes.object.isRequired,
}

export default connect(
  null,
  { deletePost }
)(PostCard);