import React from "react";
import useUser from "hooks/useUser";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { cartActions } from "store/cart-slice";
import { historyActions } from "store/history-slice";
import List from "components/common/List/List";

const Checkout = () => {
  const { data: user } = useUser();
  const cart = useSelector(state => state.cart.data);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleCheckout = () => {
    dispatch(historyActions.addToHistory({ items: cart.items }));
    dispatch(cartActions.emptyCart());
    history.push("/");
  }

  return (
    <>
      <strong><h1 className="mt-4" id="highlight">Checkout</h1></strong>
      <p>Delivering to {user.name.split(" ")[0]} at {user.address}</p>
      {cart.totalItems > 0 ? (
        <React.Fragment>
          <ul className="list-group">
            {cart.items.map(item => (
              <List
                key={item.id}
                primary={item.cropName}
                secondary={
                  <React.Fragment>
                    <p className="mb-1">
                      <span className="fw-bold">Sold by:</span> {item.farmerName}
                    </p>
                    <p className="mb-1">
                      <span className="fw-bold">Price:</span> &#8377;{item.price}/kg
                    </p>
                    <p className="mb-1">
                      <span className="fw-bold">Quantity:</span> {item.quantity} kg
                    </p>
                  </React.Fragment>
                }
                actions={
                  <React.Fragment>
                    <p className="mb-1">
                      <span className="fw-bold">Total amount:</span> &#8377;
                      {item.quantity * item.price}
                    </p>
                    <button className="btn btn-link link-danger" onClick={() => {dispatch(cartActions.removeFromCart({ id: item.id }))}}>Remove from cart</button>
                  </React.Fragment>
                }
              />
            ))}
          </ul>
          {location.pathname !== "/checkout" && (
            <button
              className="btn btn-success mt-4"
              onClick={() => {
                history.push("/checkout");
              }}
            >
              Checkout
            </button>
          )}
        </React.Fragment>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <button className="btn btn-success mt-4 btn-lg" onClick={handleCheckout}>{`Pay ₹${cart.totalAmount} and checkout`}</button>
    </>
  )
}

export default Checkout;