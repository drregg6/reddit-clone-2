import React, {
  useEffect
} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/users';

const Users = ({
  fetchUsers,
  users: { users, isLoading }
}) => {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  const render = isLoading ? (
    'Still loading'
  ) : (
    <>
      {
        users.map(user => {
          return (
            <div key={user.id}>
              <h1>{user.name}</h1>
            </div>
          )
        })
      }
    </>
  )
  return (
    <div>
      { render }
    </div>
  )
}

Users.propTypes = {
  user: PropTypes.object,
  fetchUsers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  { fetchUsers }
)(Users);