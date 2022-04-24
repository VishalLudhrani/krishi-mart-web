import React from 'react';
import { Switch } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ProductDetails from './components/Products/ProductDetails';
import UpdateProfile from './pages/UpdateProfile';

const App = () => {
  return(
    <div className="container">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/product/:id">
            <ProductDetails />
          </Route>
          <Route path="/profile/edit">
            <UpdateProfile />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
