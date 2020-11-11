import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dateFormatter from '../../utils/dateFormatter';

const PostMedia = ({
  post,
  users,
  subreddits
}) => {
  const getAuthorById = user_id => {
    return users.filter(user => user.id === user_id)[0];
  }
  const getSubredditById = subreddit_id => {
    return subreddits.filter(subreddit => subreddit.id === subreddit_id)[0];
  }
  const author = getAuthorById(post.user_id);
  const subreddit = getSubredditById(post.subreddit_id);
  return (
    <div key={post.id} className="media">
      {
        post.url !== '' && (
          <div className="media-left align-center">
            <figure className="image is-64x64">
              <img
                src={post.url}
                alt=""
              />
            </figure>
          </div>
        )
      }
      <div className="media-content post-content">
        <p>
          {subreddit && <Link to={`/r/${subreddit.name}/${post.id}`}>{post.title}</Link>}
        </p>
        <p>
          {post.desc}
        </p>
        <div className="level">
          <div className="level-item has-text-centered is-size-7">
            {subreddit && <Link to={`/r/${subreddit.name}`}>{subreddit.name}</Link>}
          </div>
          <div className="level-item has-text-centered is-size-7">
            Created { dateFormatter(post.created_at.seconds) }
          </div>
          <div className="level-item has-text-centered is-size-7">
            Updated { dateFormatter(post.updated_at.seconds) }
          </div>
          <div className="level-item has-text-centered is-size-7">
            {author && <Link to={`/u/${author.id}`}>{author.name}</Link>}
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
}

export default PostMedia;