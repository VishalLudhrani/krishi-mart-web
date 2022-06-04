import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CartItem from "../components/Cart/CartItem";
import withAuth from "../guards/with-auth";
import { cartActions } from "../store/cart-slice";

const Cart = () => {
  const cart = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();
  const history = useHistory();

  const removeItemFromCartHandler = (itemID) => {
    dispatch(cartActions.removeFromCart({ id: itemID }));
  }

  return (
    <section className="mt-4">
      <div className="d-flex justify-content-between align-items-end">
        <h1 className="display-5" id="highlight">
          My Cart
        </h1>
        <p style={{ fontSize: "1.25rem" }}>Cart total: <strong>&#8377;{cart.totalAmount}</strong></p>
      </div>
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
    </section>
  );
};

export default withAuth(Cart);
