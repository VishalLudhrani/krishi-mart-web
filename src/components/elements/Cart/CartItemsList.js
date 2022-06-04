import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CartItem from "./CartItem";
import { cartActions } from "store/cart-slice";

const CartItemsList = () => {
  const cart = useSelector(state => state.cart.data);
  const dispatch = useDispatch();
  const history = useHistory();

  const removeItemFromCartHandler = (itemID) => {
    dispatch(cartActions.removeFromCart({ id: itemID }));
  }

  return (
    <>
      {cart.totalItems > 0 ? (
        <React.Fragment>
          <ul className="list-group">
            {cart.items.map((item) => {
              return <CartItem key={item.id} item={item} onRemoveItemFromCart={removeItemFromCartHandler} />;
            })}
          </ul>
          <button className="btn btn-success mt-4" onClick={() => {history.push("/checkout")}}>Checkout</button>
        </React.Fragment>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </>
  )
}

export default CartItemsList;