import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import dateFormatter from '../../utils/dateFormatter';

import Votes from './Votes';

import { connect } from 'react-redux';
import {
  fetchPosts,
  deletePost
} from '../../actions/posts';
import { fetchUsers } from '../../actions/users';
import { fetchVotes } from '../../actions/votes';

const Posts = ({
  search,
  subreddit,
  fetchPosts,
  fetchUsers,
  fetchVotes,
  deletePost,
  posts: { posts, isLoading },
  users: { users },
  auth: { user },
  votes: { votes }
}) => {
  useEffect(() => {
    fetchPosts(subreddit);
    fetchUsers();
    fetchVotes();
  }, [
    fetchUsers,
    fetchPosts,
    fetchVotes,
    subreddit
  ]);

  const getUser = (id) => {
    return users.filter(user => user.id === id)[0];
  }

  const getVoteByPostId = (post_id) => {
    return votes.filter(doc => doc.post_id === post_id)[0];
  }

  const filterPosts = posts => {
    if (search !== '') {
      const regex = new RegExp(search, 'gi');
      return posts.filter(post => {
        return (post.title + post.desc).match(regex)
      });
    }
    return posts;
  }

  return (
    <section>
      <div className="columns is-multiline is-4 posts">
        {
          (posts && !isLoading) ? (
            filterPosts(posts).map(post => {
              const postVotes = getVoteByPostId(post.id) !== undefined ? getVoteByPostId(post.id).votes : '0';

              let userUpvotes;
              let userDownvotes;
              userUpvotes = getVoteByPostId(post.id) !== undefined ? getVoteByPostId(post.id).user_upvotes : [];
              userDownvotes = getVoteByPostId(post.id) !== undefined ? getVoteByPostId(post.id).user_downvotes : [];

              return (
                <div className="column is-4 post-column" key={post.id}>
                  {
                    post.user_id === user.id && (
                    <button
                      className="button is-danger delete-button"
                      onClick={() => (deletePost(post.id))}
                    >
                      X
                    </button>
                  )}
                  <div className="card">
                    {
                      (post.url !== '') && (
                        <div className="card-image">
                          <figure className="image">
                            <img src={ post.url !== '' ? post.url : 'https://bulma.io/images/placeholders/96x96.png' } alt={ post.title } />
                          </figure>
                        </div>
                      )
                    }
                    <div className="card-content">
                      <div className="media">
                        <div className="media-left">
                          <figure className="image is-48x48">
                            <img
                              src={ getUser(post.user_id) !== undefined ? getUser(post.user_id).image : 'https://bulma.io/images/placeholders/96x96.png' }
                              alt="user avatar"
                            />
                          </figure>
                        </div>
                        <div className="media-content">
                          {
                            post.url !== '' ? (
                              <p className="title is-4"><a href={`${ post.url }`} target="_blank" rel="noopener noreferrer">{ post.title }</a></p>
                            ) : (
                              <p className="title is-4">{ post.title }</p>
                            )
                          }
                          <p className="subtitle is-6">{ getUser(post.user_id) !== undefined ? getUser(post.user_id).name : 'Anonymous' }</p>
                        </div>
                      </div>

                      <div className="content">
                        { post.desc && post.desc }
                        <br />
                        <time>{ post.updated_at && dateFormatter(post.updated_at.seconds) }</time>
                      </div>
                      <Votes
                        post={post}
                        votes={postVotes}
                        userUpvotes={userUpvotes}
                        userDownvotes={userDownvotes}
                        currentUser={user}
                      />
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <h1>Loading</h1>
          )
        }
      </div>
    </section>
  )
}

Posts.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  fetchVotes: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  search: PropTypes.string,
  subreddit: PropTypes.string,
}

const mapStateToProps = state => ({
  posts: state.posts,
  users: state.users,
  votes: state.votes,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    fetchUsers,
    fetchPosts,
    fetchVotes,
    deletePost
  }
)(Posts);