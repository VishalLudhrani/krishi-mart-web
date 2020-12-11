import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Home from './Home';
import Register from './Register';

class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
      </BrowserRouter>
    );
  }
}

export default App;
