import React from 'react';
import PropTypes from 'prop-types';

import Container from '../layout/Container';
import PostMedia from './PostMedia';

const AllPosts = ({
  posts,
  users,
  subreddits
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
}

export default AllPosts;