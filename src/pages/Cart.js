import React from "react";
import { useSelector } from "react-redux";
import CartItemsList from "components/elements/Cart/CartItemsList";
import withAuth from "guards/with-auth";

const Cart = () => {
  const cart = useSelector((state) => state.cart.data);

  return (
    <section className="mt-4">
      <div className="d-flex justify-content-between align-items-end">
        <h1 className="display-5" id="highlight">
          My Cart
        </h1>
        <p style={{ fontSize: "1.25rem" }}>Cart total: <strong>&#8377;{cart.totalAmount}</strong></p>
      </div>
      <CartItemsList />
    </section>
  );
};

export default withAuth(Cart);
