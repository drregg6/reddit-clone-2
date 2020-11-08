import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchVotes } from '../../actions/votes';
import { fetchUser } from '../../actions/users';
import { fetchSubreddits } from '../../actions/subreddits';
import { deletePost, fetchUserPosts } from '../../actions/posts';

const User = ({
  deletePost,
  fetchUser,
  fetchVotes,
  fetchUserPosts,
  fetchSubreddits,
  posts: { posts, isLoading },
  users: { user },
  auth: { currentUser },
  subreddits: { subreddits },
  votes: { votes }
}) => {
  const { user_id } = useParams();
  useEffect(() => {
    fetchUser(user_id);
    fetchUserPosts(user_id);
    fetchSubreddits();
    fetchVotes();
  }, [
    fetchUserPosts,
    fetchSubreddits,
    fetchVotes,
    fetchUser,
    user_id
  ]);

  const getSubredditById = subreddit_id => {
    return subreddits.filter(subreddit => subreddit.id === subreddit_id)[0];
  }
  const getVoteIdByPost = post_id => {
    return votes.filter(vote => vote.post_id === post_id)[0];
  }

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
              let vote_id = getVoteIdByPost(post.id);
              let subreddit = getSubredditById(post.subreddit_id);
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
                        { subreddit !== undefined && <Link to={`/r/${subreddit.name}/${post.id}`}>{post.title}</Link> }
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
                            onClick={() => deletePost(post.id, vote_id)}
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
  fetchVotes: PropTypes.func.isRequired,
  fetchSubreddits: PropTypes.func.isRequired,
  users: PropTypes.object,
  auth: PropTypes.object,
  posts: PropTypes.object,
  votes: PropTypes.object,
  subreddits: PropTypes.object,
}

const mapStateToProps = state => ({
  users: state.users,
  auth: state.auth,
  posts: state.posts,
  votes: state.votes,
  subreddits: state.subreddits
});

export default connect(
  mapStateToProps,
  {
    deletePost,
    fetchUser,
    fetchVotes,
    fetchUserPosts,
    fetchSubreddits,
  }
)(User)