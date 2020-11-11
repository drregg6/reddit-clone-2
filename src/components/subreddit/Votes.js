import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { upvote, downvote } from '../../actions/votes';

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
    <div className="votes">
      <button
        className={`button is-success is-small ${userUpvotes.indexOf(currentUser.id) !== -1 && 'is-light'}`}
        disabled={Object.entries(currentUser).length === 0}
        onClick={() => upvote(vote_id, post_id, user_id)}
      >
        Upvote
      </button>
      <span className="vote-amount my-1">{ votes }</span>
      <button
        className={`button is-danger is-small ${userDownvotes.indexOf(currentUser.id) !== -1 && 'is-light'}`}
        disabled={Object.entries(currentUser).length === 0}
        onClick={() => downvote(vote_id, post_id, user_id)}
      >
        Downvote
      </button>
    </div>
  )
}

Votes.propTypes = {
  postId: PropTypes.string.isRequired,
  userUpvotes: PropTypes.array,
  userDownvotes: PropTypes.array,
  currentUser: PropTypes.object.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
}

export default connect(
  null,
  { upvote, downvote }
)(Votes);