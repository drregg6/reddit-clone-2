import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dateFormatter from '../../utils/dateFormatter';
import getDocById from '../../utils/getDocById';
import LinkImage from '../../images/defaults/link.png';

import Votes from '../subreddit/Votes';

const PostMedia = ({
  post,
  users,
  votes,
  currentUser,
  subreddits
}) => {
  const author = getDocById(users, post.user_id);
  const subreddit = getDocById(subreddits, post.subreddit_id);
  let vote = getDocById(votes, post.id, 'post_id');

  return (
    <div key={post.id} className="media">
      {
        vote !== undefined && (
          <div className="media-left">
            <Votes
              voteId={vote.id}
              postId={vote.post_id}
              votes={vote.votes}
              userUpvotes={vote.user_upvotes}
              userDownvotes={vote.user_downvotes}
              currentUser={currentUser}
            />
          </div>
        )
      }
      <div className={`media-image media-left align-center`}>
        <figure className={`image is-64x64`}>
          <a href={(post.image !== undefined && post.image !== '') ? post.image : post.url} rel="noopener noreferrer" target="_blank">
            <img
              src={(post.image !== undefined && post.image !== '') ? post.image : LinkImage}
              alt=""
            />
          </a>
        </figure>
      </div>
      <div className={`media-content post-content`}>
        <p>
          {subreddit && <Link to={`/r/${subreddit.name}/${post.id}`}>{post.title}</Link>}
        </p>
        <p>
          {post.desc}
        </p>
        <div className="level">
          <div className="level-item has-text-centered is-size-7">
            Created { dateFormatter(post.created_at.seconds) }
          </div>
          <div className="level-item has-text-centered is-size-7">
            Updated { dateFormatter(post.updated_at.seconds) }
          </div>
          <div className="level-item has-text-centered is-size-7">
            {author && <Link to={`/u/${author.id}`}>{author.name}</Link>}
          </div>
          <div className="level-item has-text-centered is-size-7">
            {subreddit && <Link to={`/r/${subreddit.name}`}>{subreddit.name}</Link>}
          </div>
        </div>
      </div>
    </div>
  )
}

PostMedia.propTypes = {
  post: PropTypes.object,
  users: PropTypes.array,
  subreddits: PropTypes.array,
  votes: PropTypes.array,
  currentUser: PropTypes.object,
}

export default PostMedia;