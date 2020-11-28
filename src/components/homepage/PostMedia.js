import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dateFormatter from '../../utils/dateFormatter';
import getDocById from '../../utils/getDocById';
import getTextPreview from '../../utils/getTextPreview';
import LinkImage from '../../images/defaults/link.png';
import SpeechBubble from '../../images/defaults/speech-bubble.jpg';

import MarkedText from '../layout/MarkedText';
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
    <div className="my-6 media">
      {
        vote !== undefined && (
          <div className="media-left align-center">
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
      <div className="media-image media-left align-center">
        <a href={(post.image !== undefined && post.image !== '') ? post.image : post.url} rel="noopener noreferrer" target="_blank">
          <figure className="image is-128x128 center-image border-image">
            <img
              src={(post.image !== undefined && post.image !== '') ? post.image : (post.url !== undefined && post.url !== '') ? LinkImage : SpeechBubble}
              alt=""
            />
          </figure>
        </a>
      </div>
      <div className={`media-content post-content`}>
        <p>
          {subreddit && <Link to={`/r/${subreddit.name}/${post.id}`}>{post.title}</Link>}
        </p>
        {
          post.desc && (
            <div className="mb-3">
              <MarkedText>{getTextPreview(post.desc)}</MarkedText>
            </div>
          )
        }
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