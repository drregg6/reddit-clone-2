import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PostCard from './PostCard';

import { connect } from 'react-redux';
import {
  fetchPosts
} from '../../actions/posts';
import { fetchUsers } from '../../actions/users';
import { fetchVotes } from '../../actions/votes';

const Posts = ({
  search,
  subreddit,
  subreddit_id,
  fetchPosts,
  fetchUsers,
  fetchVotes,
  posts: { posts, isLoading },
  users: { users },
  auth: { user },
  votes: { votes }
}) => {
  useEffect(() => {
    fetchPosts(subreddit_id);
    fetchUsers();
    fetchVotes();
  }, [
    fetchUsers,
    fetchPosts,
    fetchVotes,
    subreddit_id
  ]);

  const [ sortByVote, toggleSortByVote ] = useState(false);
  const [ sortByNew, toggleSortByNew ] = useState(true);

  const getUser = (id) => {
    return users.filter(user => user.id === id)[0];
  }

  const getVoteByPostId = post_id => {
    return votes.filter(doc => doc.post_id === post_id)[0];
  }

  const getPostByVoteId = post_id => {
    return posts.filter(doc => doc.id === post_id)[0];
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

  const orderByVotes = posts => {
    let postVotes = posts.map(post => getVoteByPostId(post.id));
    let orderedVotes = postVotes.sort((a, b) => {
      return b.votes - a.votes;
    });
    return orderedVotes.map(vote => {
      if (vote) {
        return getPostByVoteId(vote.post_id);
      } else {
        return null;
      }
    });
  }

  const handleSortByVote = () => {
    toggleSortByVote(true);
    toggleSortByNew(false);
  }
  const handleSortByNew = () => {
    toggleSortByNew(true);
    toggleSortByVote(false);
  }

  return (
    <section>
      <button
        className={`button is-primary ${sortByVote && `is-light`}`}
        onClick={() => handleSortByVote()}
        disabled={sortByVote}
      >
        Sort By Most Votes
      </button>
      <button
        className={`button is-info ${sortByNew && `is-light`}`}
        onClick={() => handleSortByNew()}
        disabled={sortByNew}
      >
        Sort By New
      </button>
      <div className="columns is-multiline is-4 posts">
        {
          (posts && !isLoading) ? sortByVote ? (
            orderByVotes(posts).map(post => {
              // vote information
              let postVotes = {
                voteId: '',
                userUpvotes: [],
                userDownvotes: [],
                votes: 0
              }
              postVotes.voteId = getVoteByPostId(post.id) !== undefined && getVoteByPostId(post.id).id;
              postVotes.votes = getVoteByPostId(post.id) !== undefined ? getVoteByPostId(post.id).votes : '0';
              postVotes.userUpvotes = getVoteByPostId(post.id) !== undefined ? getVoteByPostId(post.id).user_upvotes : [];
              postVotes.userDownvotes = getVoteByPostId(post.id) !== undefined ? getVoteByPostId(post.id).user_downvotes : [];

              // author information
              let author = getUser(post.user_id) !== undefined ? getUser(post.user_id) : { name: 'Anonymous', image: 'https://bulma.io/images/placeholders/96x96.png' }

              return (
                <PostCard
                  currentUser={user}
                  post_id={post.id}
                  user_id={post.user_id}
                  subreddit={subreddit}
                  url={post.url}
                  title={post.title}
                  desc={post.desc}
                  updated_at={post.updated_at}
                  author={author}
                  postVotes={postVotes}
                />
              )
            })
          ) : (
            filterPosts(posts).map(post => {
              // vote information
              let postVotes = {
                voteId: '',
                userUpvotes: [],
                userDownvotes: [],
                votes: 0
              }
              postVotes.voteId = getVoteByPostId(post.id) !== undefined && getVoteByPostId(post.id).id;
              postVotes.votes = getVoteByPostId(post.id) !== undefined ? getVoteByPostId(post.id).votes : '0';
              postVotes.userUpvotes = getVoteByPostId(post.id) !== undefined ? getVoteByPostId(post.id).user_upvotes : [];
              postVotes.userDownvotes = getVoteByPostId(post.id) !== undefined ? getVoteByPostId(post.id).user_downvotes : [];

              // author information
              let author = getUser(post.user_id) !== undefined ? getUser(post.user_id) : { name: 'Anonymous', image: 'https://bulma.io/images/placeholders/96x96.png' }

              return (
                <PostCard
                  currentUser={user}
                  post_id={post.id}
                  user_id={post.user_id}
                  subreddit={subreddit}
                  url={post.url}
                  title={post.title}
                  desc={post.desc}
                  updated_at={post.updated_at}
                  author={author}
                  postVotes={postVotes}
                />
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
  search: PropTypes.string,
  subreddit: PropTypes.string,
  subreddit_id: PropTypes.string,
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
    fetchVotes
  }
)(Posts);