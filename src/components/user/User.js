import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import getDocById from '../../utils/getDocById';
import { isMobile } from 'react-device-detect';

import Container from '../layout/Container';
import UserPost from './UserPost';
import UserComment from './UserComment';
import UserMobileComment from '../mobile/UserMobileComment';
import UserMobileCard from '../mobile/UserMobileCard';

import { connect } from 'react-redux';
import { fetchVotes } from '../../actions/votes';
import { fetchUser } from '../../actions/users';
import { fetchSubreddits } from '../../actions/subreddits';
import { deletePost, fetchUserPosts } from '../../actions/posts';
import { deleteComment, fetchUserComments } from '../../actions/comments';

const User = ({
  deletePost,
  deleteComment,
  fetchUser,
  fetchVotes,
  fetchUserPosts,
  fetchUserComments,
  fetchSubreddits,
  posts: { posts, isLoading },
  comments: { comments },
  users: { user, users },
  auth: { currentUser },
  subreddits: { subreddits },
  votes: { votes }
}) => {
  const { user_id } = useParams();
  useEffect(() => {
    fetchUser(user_id);
    fetchUserPosts(user_id);
    fetchUserComments(user_id);
    fetchSubreddits();
    fetchVotes();
  }, [
    fetchUserPosts,
    fetchSubreddits,
    fetchUserComments,
    fetchVotes,
    fetchUser,
    user_id
  ]);
  const [ userPostList, toggleUserPostList ] = useState(true);
  const [ userCommentList, toggleUserCommentList ] = useState(false);

  const handlePostList = () => {
    toggleUserPostList(true);
    toggleUserCommentList(false);
  }
  const handleCommentList = () => {
    toggleUserCommentList(true);
    toggleUserPostList(false);
  }

  return (
    <section>
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
              (user !== null && user.bio !== '') && (
                <h2 className="subtitle">{user.bio}</h2>
              )
            }
          </div>
        </div>
      </div>
      <Container>
        <div className="buttons my-2">
          <button
            className={`button is-small is-info ${userPostList && 'is-light'}`}
            disabled={userPostList}
            onClick={() => handlePostList()}
          >
            User Posts
          </button>
          <button
            className={`button is-small is-warning ${userCommentList && 'is-light'}`}
            disabled={userCommentList}
            onClick={() => handleCommentList()}
          >
            User Comments
          </button>
        </div>
        {
          userPostList && (
            <div className="user-posts">
              {
                (posts.length !== 0 && !isLoading) && (
                  posts.map(post => {
                    let vote = getDocById(votes, post.id, 'post_id');
                    let subreddit = getDocById(subreddits, post.subreddit_id);
                    return isMobile ? (
                      <UserMobileCard
                        key={post.id}
                        post={post}
                        user={user}
                        subreddit={subreddit}
                        currentUser={currentUser}
                        vote={vote}
                        deletePost={deletePost}
                      />
                    ) : (
                      <UserPost
                        key={post.id}
                        vote={vote}
                        subreddit={subreddit}
                        currentUser={currentUser}
                        deletePost={deletePost}
                        user={user}
                        post={post}
                      />
                    )
                  })
                )
              }
            </div>
          )
        }
        {
          userCommentList && (
            <div className="user-comments">
              {
                (comments.length !== 0 && !isLoading) && (
                  comments.map(comment => {
                    return isMobile ? (
                      <UserMobileComment
                        key={comment.id}
                        comment={comment}
                        user={user}
                        currentUser={currentUser}
                        deleteComment={deleteComment}
                      />
                    ) : (
                      <UserComment
                        key={comment.id}
                        comment={comment}
                        user={user}
                        currentUser={currentUser}
                        deleteComment={deleteComment}
                      />
                    )
                  })
                )
              }
            </div>
          )
        }
      </Container>
    </section>
  )
}

User.propTypes = {
  deletePost: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  fetchUserPosts: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  fetchVotes: PropTypes.func.isRequired,
  fetchSubreddits: PropTypes.func.isRequired,
  fetchUserComments: PropTypes.func.isRequired,
  users: PropTypes.object,
  auth: PropTypes.object,
  posts: PropTypes.object,
  votes: PropTypes.object,
  comments: PropTypes.array,
  subreddits: PropTypes.object,
}

const mapStateToProps = state => ({
  users: state.users,
  auth: state.auth,
  posts: state.posts,
  votes: state.votes,
  subreddits: state.subreddits,
  comments: state.comments
});

export default connect(
  mapStateToProps,
  {
    deletePost,
    deleteComment,
    fetchUser,
    fetchVotes,
    fetchUserPosts,
    fetchSubreddits,
    fetchUserComments
  }
)(User)