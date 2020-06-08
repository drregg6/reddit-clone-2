import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Index from './components/homepage/Index';
import Users from './components/users/Users';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={Index} />
          <Route exact path='/users' component={Users} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
