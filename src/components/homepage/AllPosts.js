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
  return (
    <Container>
      <h1 className="mb-6 has-text-centered">Check out the latest posts</h1>
      {
        posts.length !== 0 && (
          posts.map(post => {
            return (
              <PostMedia
                post={post}
                users={users}
                subreddits={subreddits}
                votes={votes}
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