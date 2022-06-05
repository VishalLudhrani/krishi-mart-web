import CartItemsList from "components/elements/Cart/CartItemsList";
import useUser from "hooks/useUser";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { cartActions } from "store/cart-slice";
import { historyActions } from "store/history-slice";

const Checkout = () => {
  const { data: user } = useUser();
  const cart = useSelector(state => state.cart.data);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleCheckout = () => {
    dispatch(historyActions.addToHistory({ items: cart.items }));
    dispatch(cartActions.emptyCart());
    history.push("/");
  }

  return (
    <>
      <strong><h1 className="mt-4" id="highlight">Checkout</h1></strong>
      <p>Delivering to {user.name.split(" ")[0]} at {user.address}</p>
      <CartItemsList />
      <button className="btn btn-success mt-4 btn-lg" onClick={handleCheckout}>{`Pay ₹${cart.totalAmount} and checkout`}</button>
    </>
  )
}

export default Checkout;