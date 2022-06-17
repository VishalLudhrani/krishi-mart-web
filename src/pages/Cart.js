import React from "react";
import { useDispatch, useSelector } from "react-redux";
import withAuth from "guards/with-auth";
import List from "components/common/List/List";
import { useHistory, useLocation } from "react-router-dom";
import { cartActions } from "store/cart-slice";

const Cart = () => {
  const cart = useSelector((state) => state.cart.data);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

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
    </section>
  );
};

export default withAuth(Cart);
