import React from 'react';
import PropTypes from 'prop-types';

import Container from '../layout/Container';
import PostMedia from './PostMedia';

const AllPosts = ({
  posts,
  users,
  subreddits,
  currentUser,
  votes
}) => {
  const getVoteByPostId = post_id => {
    return votes.filter(vote => vote.post_id === post_id)[0];
  }
  return (
    <Container>
      <h1 className="mb-6 has-text-centered">Check out the latest posts</h1>
      {
        posts.length !== 0 && (
          posts.map(post => {
            let vote = getVoteByPostId(post.id);
            return (
              <PostMedia
                post={post}
                users={users}
                subreddits={subreddits}
                vote={vote}
                currentUser={currentUser}
              />
            )
          })
        )
      }
    </Container>
  )
}

AllPosts.propTypes = {
  posts: PropTypes.array,
  users: PropTypes.array,
  subreddits: PropTypes.array,
  votes: PropTypes.array,
  currentUser: PropTypes.object,
}

export default AllPosts;