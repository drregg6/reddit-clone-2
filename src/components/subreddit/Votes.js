import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
  upvote,
  downvote
} from '../../actions/votes';

const Votes = ({
  postId,
  voteId,
  upvote,
  downvote,
  votes,
  userUpvotes,
  userDownvotes,
  currentUser
}) => {
  let vote_id = voteId;
  let post_id = postId;
  let user_id = currentUser.id;
  return (
    <div className="votes" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {
        Object.entries(currentUser).length === 0 ? ( // If User is a guest the button should not be accessible
          <button
            className="button is-success"
            disabled
          >
            Upvote
          </button>
        ) : userUpvotes.indexOf(currentUser.id) !== -1 ? ( // If the User has upvoted the post, make the button light
          <button
            className="button is-success is-light"
            onClick={() => upvote(vote_id, post_id, user_id)}
          >
            Upvote
          </button>
        ) : ( // Else make it a normal button
          <button
            className="button is-success"
            onClick={() => upvote(vote_id, post_id, user_id)}
          >
            Upvote
          </button>
        )
      }
      <span className="vote-amount" style={{ margin: '0 1rem' }}>{ votes }</span>
      {
        Object.entries(currentUser).length === 0 ? (
          <button
            className="button is-danger"
            disabled
          >
            Downvote
          </button>
        ) : userDownvotes.indexOf(currentUser.id) !== -1 ? (
          <button
            className="button is-danger is-light"
            onClick={() => downvote(vote_id, post_id, user_id)}
          >
            Downvote
          </button>
        ) : (
          <button
            className="button is-danger"
            onClick={() => downvote(vote_id, post_id, user_id)}
          >
            Downvote
          </button>
        )
      }
    </div>
  )
}

Votes.propTypes = {
  voteId: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  userUpvotes: PropTypes.array,
  userDownvotes: PropTypes.array,
  currentUser: PropTypes.object.isRequired,
}

export default connect(
  null,
  {
    upvote,
    downvote
  }
)(Votes);