import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LinkImage from '../../images/defaults/link.png';

const UserMobileCard = ({
  post,
  user,
  subreddit,
  currentUser,
  vote,
  deletePost
}) => {
  console.log(LinkImage);
  return (
    <div className="card ">
      {
        post !== undefined && (
          <div className="card-image">
            <figure className="image is-4by3">
              <a href={(post.image !== undefined && post.image !== '') ? post.image : post.url} rel="noopener noreferrer" target="_blank">
                <img
                  src={(post.image !== undefined && post.image !== '') ? post.image : LinkImage}
                  alt=""
                />
              </a>
            </figure>
          </div>
        )
      }
      <div className="card-content">
        <p className="mt-0 mb-0">
          {subreddit !== undefined && <Link to={`/r/${subreddit.name}/${post.id}`}>{post.title}</Link>}
        </p>
        {
          post.desc && (
            <p className="mt-0 mb-0">
              {post.desc}
            </p>
          )
        }
      </div>
      {
        (user !== null && user.id === currentUser.id) && (
          <button className="delete-button" onClick={() => deletePost(post.id, vote.id)}>X</button>
        )
      }
    </div>
  )
}

UserMobileCard.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
  subreddit: PropTypes.object,
  currentUser: PropTypes.object,
  vote: PropTypes.object,
  deletePost: PropTypes.func,
}

export default UserMobileCard;