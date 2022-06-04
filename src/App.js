import { Switch } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ProductDetails from './pages/ProductDetails';
import UpdateProfile from './pages/UpdateProfile';
import UserProfile from './pages/UserProfile';
import Cart from './pages/Cart';
import useUser from './hooks/useUser';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { sendCartData, fetchCartData } from './store/cart-slice';

const App = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { changed: cartChanged, data: cartData } = cart;
  const { data: fetchedUser, cartExists } = useUser();
  const uid = fetchedUser.uid;

  useEffect(() => {
    if (cartExists) {
      dispatch(fetchCartData(uid));
    }
  }, [uid, dispatch, cartExists]);

  useEffect(() => {
    if (cartChanged) {
      dispatch(sendCartData(uid, cartData));
    } 
  }, [uid, cartChanged, cartData, dispatch]);

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
          <Route path="/cart">
            <Cart />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
