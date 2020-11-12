import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dateFormatter from '../../utils/dateFormatter';

import { connect } from 'react-redux';
import { upvote, downvote } from '../../actions/votes';

const MobileCard = ({
  post,
  users,
  votes,
  currentUser,
  subreddits
}) => {
  const getAuthorById = user_id => {
    return users.filter(user => user.id === user_id)[0];
  }
  const getSubredditById = subreddit_id => {
    return subreddits.filter(subreddit => subreddit.id === subreddit_id)[0];
  }
  const getVoteByPostId = post_id => {
    return votes.filter(vote => vote.post_id === post_id)[0];
  }
  const author = getAuthorById(post.user_id);
  const subreddit = getSubredditById(post.subreddit_id);
  let vote = getVoteByPostId(post.id);

  return (
    <div className="card" key={post.id}>
      {
        post.url !== '' && (
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={post.url} alt="" />
            </figure>
          </div>
        )
      }
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
          <p>
            {post.desc}
          </p>
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
}

export default connect(
  null,
  { upvote, downvote }
)(MobileCard);