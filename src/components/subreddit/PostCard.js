import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dateFormatter from '../../utils/dateFormatter';
import LinkImage from '../../images/defaults/link.png';

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

  return (
    <div className="media" key={post_id}>
      <div className="media-left">
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
        <figure className="image is-64x64">
          <a href={(post.image !== undefined && post.image !== '') ? post.image : post.url} rel="noopener noreferrer" target="_blank">
            <img
              src={(post.image !== undefined && post.image !== '') ? post.image : LinkImage}
              alt=""
            />
          </a>
        </figure>
      </div>
      <div className="media-content post-content">
        <p className="has-text-weight-bold">
          <Link to={`/r/${subreddit}/${post_id}`}>{post.title}</Link>
        </p>
        {
          post.desc !== '' && (
            <p>{post.desc}</p>
          )
        }
        <div className="level is-size-7">
          <div className="level-right">
            <div className="level-item">
              <span className="has-text-weight-bold mr-1">Updated:</span> { dateFormatter(post.updated_at.seconds) }
            </div>
            <div className="level-item">
              <figure className="image is-24x24 mr-2">
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