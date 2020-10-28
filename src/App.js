/*



*/

import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import firebase from './firebase';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Index from './components/homepage/Index';
import Users from './components/users/Users';
import Subreddit from './components/subreddit/Subreddit';

import store from './store';
import { getUser, userError } from './actions/auth';

function App() {
  // check if a user is logged in throughout
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      // if a user exists, update the store with user information
      if (user) {
        let setUser = {
          name: user.displayName,
          id: user.uid,
          image: user.photoURL
        }
        store.dispatch(getUser(setUser));
      } else {
        store.dispatch(userError());
      }
    });
  });
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path='/' component={Index} />
              <Route exact path='/users' component={Users} />
              <Route exact path ='/r/:name' component={Subreddit} />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
