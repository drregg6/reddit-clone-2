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
  votes
}) => {
  return (
    <div className="votes" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <button
        className="button is-success"
        onClick={() => upvote(id, user_id)}
      >
        Upvote
      </button>
      <span className="vote-amount" style={{ margin: '0 1rem' }}>{ votes }</span>
      <button
        className="button is-danger"
        onClick={() => downvote(id, user_id)}
      >
        Downvote
      </button>
    </div>
  )
}

Votes.propTypes = {
  post: PropTypes.object.isRequired,
  votes: PropTypes.number.isRequired
}

export default connect(
  null,
  {
    upvote,
    downvote
  }
)(Votes);