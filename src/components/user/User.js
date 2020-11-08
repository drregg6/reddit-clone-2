/*

TODO
= Need the subreddit ID
= Need the vote ID

*/

import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchUser } from '../../actions/users';
import { deletePost, fetchUserPosts } from '../../actions/posts';

const User = ({
  deletePost,
  fetchUser,
  fetchUserPosts,
  posts: { posts, isLoading },
  users: { user },
  auth: { currentUser }
}) => {
  const { user_id } = useParams();
  useEffect(() => {
    fetchUser(user_id);
    fetchUserPosts(user_id);
  }, [
    fetchUserPosts,
    fetchUser,
    user_id
  ]);

  return (
    <div className="section">
      <div className="hero is-primary mb-5">
        <div className="hero-body">
          <div className="container has-text-centered">
            <figure className="image is-128x128" style={{ margin: '0 auto' }}>
              <img src={ (user !== null && user.image) && user.image } alt="User avatar" />
            </figure>
            <h1 className="title">
              { user !== null && user.name }
            </h1>
            {
              (user !== null && user.body !== '') && (
                <h2 className="subtitle">{user.body}</h2>
              )
            }
          </div>
        </div>
      </div>
      <div className="user-posts">
        {
          (posts.length !== 0 && !isLoading) && (
            posts.map(post => {
              return (
                <div key={post.id} className="box">
                  <div className="media">
                  { 
                      post.url && (
                        <div className="media-left">
                          <figure className="image is-128x128">
                            <img
                              src={ post.url }
                              alt={ post.title }
                            />
                          </figure>
                        </div>
                      )
                    }
                    <div className="media-content">
                      <p className="has-text-weight-bold">
                        <Link to={`/`}>{post.title}</Link>
                      </p>
                      {
                        post.desc && (
                          <p>
                            {post.desc}
                          </p>
                        )
                      }
                    </div>
                    {
                      (user !== null && user.id === currentUser.id) && (
                        <div className="media-right">
                          <button
                            className="delete"
                            onClick={() => deletePost()}
                          >
                            X
                          </button>
                        </div>
                      )
                    }
                  </div>
                </div>
              )
            })
          )
        }
      </div>
    </div>
  )
}

User.propTypes = {
  deletePost: PropTypes.func.isRequired,
  fetchUserPosts: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  users: PropTypes.object,
  auth: PropTypes.object,
  posts: PropTypes.object,
}

const mapStateToProps = state => ({
  users: state.users,
  auth: state.auth,
  posts: state.posts
});

export default connect(
  mapStateToProps,
  {
    deletePost,
    fetchUser,
    fetchUserPosts
  }
)(User)