import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </nav>
  )
}

// Nav.propTypes = {

// }

export default Nav;