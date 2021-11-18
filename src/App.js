import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import EditUser from './pages/EditUser';
import ProductDetails from './pages/ProductDetails';
import UserProfile from './pages/UserProfile';
import AddCrop from './pages/AddCrop';
import Cart from './pages/Cart';
import Navbar from './Components/Navbar';

class App extends React.Component {
  render() {
    return(
      <div className="container">
        <BrowserRouter>
          <Navbar />
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/update-profile" exact component={EditUser} />
          <Route path="/product/:id" exact component={ProductDetails} />
          <Route path="/user-profile" exact component={UserProfile} />
          <Route path="/add-crop" exact component={AddCrop} />
          <Route path="/cart" exact component={Cart} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
