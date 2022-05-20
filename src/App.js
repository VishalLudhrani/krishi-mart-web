import { Switch } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ProductDetails from './pages/ProductDetails';
import UpdateProfile from './pages/UpdateProfile';
import UserProfile from './pages/UserProfile';

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
          <Route path="/profile/me">
            <UserProfile />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
