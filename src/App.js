import { Switch } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from 'pages/Home';
import Navbar from 'components/elements/Navbar/Navbar';
import ProductDetails from 'pages/ProductDetails';
import UpdateProfile from 'pages/UpdateProfile';
import UserProfile from 'pages/UserProfile';
import Cart from 'pages/Cart';
import useUser from 'hooks/useUser';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { sendCartData, fetchCartData } from 'store/cart-slice';
import Checkout from 'pages/Checkout';
import { fetchHistory, sendHistory } from 'store/history-slice';

const App = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { changed: cartChanged, data: cartData } = cart;
  const history = useSelector((state) => state.history);
  const { changed: historyChanged, data: historyData } = history;
  const { data: fetchedUser, cartExists, historyExists } = useUser();
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

  useEffect(() => {
    if (historyExists) {
      dispatch(fetchHistory(uid));
    }
  }, [uid, historyExists, dispatch]);

  useEffect(() => {
    if (historyChanged) {
      dispatch(sendHistory(uid, historyData));
    }
  }, [dispatch, historyChanged, historyData, uid]);

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
          <Route path="/checkout">
            <Checkout />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
