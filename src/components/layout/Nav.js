import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { login, logout } from '../../actions/auth';

const Nav = ({
  login,
  logout,
  auth: { currentUser, isLoggedIn }
}) => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          One Kickass Site
        </Link>

        <a href="!#" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            Home
          </Link>

          <Link className="navbar-item" to="/users">
            Users
          </Link>
        </div>

        <div className="navbar-end">
            {
              !isLoggedIn ? (
                <div className="navbar-item">
                  <button className="button is-primary" onClick={() => login()}>
                    <strong>Login with Google</strong>
                  </button>
                </div>
              ) : (
                <>
                  <div className="navbar-item">
                    <Link to={`u/${currentUser.id}`} className="button is-light is-info">{currentUser.name}</Link>
                  </div>
                  <div className="navbar-item">
                    <button className="button is-danger" onClick={() => logout()}>
                      Logout
                    </button>
                  </div>
                </>
              )
            }
        </div>
      </div>
    </nav>
  )
}

Nav.propTypes = {
  auth: PropTypes.object,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { login, logout }
)(Nav);