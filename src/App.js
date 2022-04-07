import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Navbar from './components/Navbar';

const App = () => {
  return(
    <div className="container">
      <BrowserRouter>
        <Navbar />
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
