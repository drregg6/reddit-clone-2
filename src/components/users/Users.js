import React, {
  useEffect
} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user';

const Users = ({
  fetchUsers,
  user: { users, isLoading }
}) => {
  useEffect(() => {
    fetchUsers();
  }, []);
  
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
  user: state.user
});

export default connect(
  mapStateToProps,
  { fetchUsers }
)(Users);