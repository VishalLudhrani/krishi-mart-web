import { Switch } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ProductDetails from './pages/ProductDetails';
import UpdateProfile from './pages/UpdateProfile';
import UserProfile from './pages/UserProfile';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartData, sendCartData } from './store/cart-slice';
import useUser from './hooks/useUser';
import { userActions } from './store/user-slice';

const App = () => {

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.data);
  const storedCartIsEmpty = cart.items.length === 0;
  const { data: user, isLoggedIn, cartExists } = useUser();
  const uid = user.uid;

  useEffect(() => {
    if (isLoggedIn && cartExists && !storedCartIsEmpty) {
      dispatch(sendCartData(uid, cart));
    }
    if (!storedCartIsEmpty) {
      dispatch(userActions.toggleCartState({ cartExists: true }));
    }
  }, [cart, dispatch, uid, isLoggedIn, cartExists, storedCartIsEmpty]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCartData(uid));
    }
  }, [uid, dispatch, isLoggedIn]);

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
