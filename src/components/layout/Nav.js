import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { login, logout } from '../../actions/auth';
import { fetchSubreddits } from '../../actions/subreddits';

const Nav = ({
  login,
  logout,
  fetchSubreddits,
  subreddits: { subreddits },
  auth: { currentUser, isLoggedIn }
}) => {
  useEffect(() => {
    fetchSubreddits();
  }, [fetchSubreddits]);

  const [ isActive, setIsActive ] = useState(false);

  return (
    <nav className="navbar is-light" role="navigation" aria-label="dropdown navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          Dave Regg's Personal Reddit
        </Link>

        <a
          role="button"
          className={`navbar-burger burger ${isActive && 'is-active'}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => setIsActive(!isActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className={`navbar-menu ${isActive && 'is-active'}`}>
        <div className="navbar-start">
          <div className="navbar-item has-dropdown is-hoverable">
            <Link to="/r/index" className="navbar-link is-arrowless">
              Subreddits
            </Link>
            <div className="navbar-dropdown">
              {
                subreddits !== null && (
                  subreddits.map(subreddit => {
                    return (
                      <Link key={subreddit.id} className="navbar-item is-capitalized" to={`/r/${subreddit.name}`}>{subreddit.name}</Link>
                    )
                  })
                )
              }
              { isLoggedIn && <Link className="navbar-item" to='/create-a-subreddit'>Create a Subreddit</Link> }
            </div>
          </div>
          <div className="navbar-item">
            { isLoggedIn && <Link to='/create-a-subreddit'>Create a Subreddit</Link>}
          </div>
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
                    <Link to={`/u/${currentUser.id}`} className="button is-light is-info">{currentUser.name}</Link>
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
  logout: PropTypes.func.isRequired,
  fetchSubreddits: PropTypes.func.isRequired,
  subreddits: PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.auth,
  subreddits: state.subreddits
});

export default connect(
  mapStateToProps,
  {
    login,
    logout,
    fetchSubreddits
  }
)(Nav);