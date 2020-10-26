/*

User login does not persist within store
Although user remains loaded

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

function App() {
  useEffect(() => {
    // check for user in firebase auth on each page
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
      } else {
        console.log('No user available')
      }
    });
  });
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={Index} />
          <Route exact path='/users' component={Users} />
          <Route exact path ='/r/:name' component={Subreddit} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
