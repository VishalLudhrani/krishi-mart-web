import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import EditUser from './pages/EditUser';

class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/update-profile" exact component={EditUser} />
      </BrowserRouter>
    );
  }
}

export default App;
