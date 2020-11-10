import React from 'react';
import PropTypes from 'prop-types';

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
      {
        Object.entries(currentUser).length === 0 ? ( // If User is a guest the button should not be accessible
          <button
            className="button is-success is-small"
            disabled
          >
            Upvote
          </button>
        ) : userUpvotes.indexOf(currentUser.id) !== -1 ? ( // If the User has upvoted the post, make the button light
          <button
            className="button is-success is-light is-small"
            onClick={() => upvote(vote_id, post_id, user_id)}
          >
            Upvote
          </button>
        ) : ( // Else make it a normal button
          <button
            className="button is-success is-small"
            onClick={() => upvote(vote_id, post_id, user_id)}
          >
            Upvote
          </button>
        )
      }
      <span className="vote-amount my-1">{ votes }</span>
      {
        Object.entries(currentUser).length === 0 ? (
          <button
            className="button is-danger is-small"
            disabled
          >
            Downvote
          </button>
        ) : userDownvotes.indexOf(currentUser.id) !== -1 ? (
          <button
            className="button is-danger is-light is-small"
            onClick={() => downvote(vote_id, post_id, user_id)}
          >
            Downvote
          </button>
        ) : (
          <button
            className="button is-danger is-small"
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
  postId: PropTypes.string.isRequired,
  userUpvotes: PropTypes.array,
  userDownvotes: PropTypes.array,
  currentUser: PropTypes.object.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
}

export default Votes;