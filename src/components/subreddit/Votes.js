import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
  upvote,
  downvote
} from '../../actions/votes';

const Votes = ({
  post: {id, user_id},
  upvote,
  downvote,
  votes,
  userUpvotes,
  userDownvotes,
  currentUser
}) => {
  console.log(currentUser.id)
  return (
    <div className="votes" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {
        userUpvotes.indexOf(currentUser.id) !== -1 || Object.entries(currentUser).length === 0 ? (
          <button
            className="button is-success"
            disabled
          >
            Upvote
          </button>
        ) : (
          <button
            className="button is-success"
            onClick={() => upvote(id, user_id)}
          >
            Upvote
          </button>
        )
      }
      <span className="vote-amount" style={{ margin: '0 1rem' }}>{ votes }</span>
      {
        userDownvotes.indexOf(currentUser.id) !== -1 || Object.entries(currentUser).length === 0 ? (
          <button
            className="button is-danger"
            disabled
          >
            Downvote
          </button>
        ) : (
          <button
            className="button is-danger"
            onClick={() => downvote(id, user_id)}
          >
            Downvote
          </button>
        )
      }
    </div>
  )
}

Votes.propTypes = {
  post: PropTypes.object.isRequired,
  votes: PropTypes.number.isRequired,
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