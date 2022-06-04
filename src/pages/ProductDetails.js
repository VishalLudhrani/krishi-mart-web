import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/database";
import { ObjectifyCamelCase } from "utils/ObjectifyCamelCase";
import useUser from "hooks/useUser";
import withAuth from "guards/with-auth";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "store/cart-slice";

const ProductDetails = (props) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { data: user } = useUser();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.data);
  const isAddedToCart = cart.items.find((item) => item.id === id);

  useEffect(() => {
    firebase
      .database()
      .ref("products/" + id)
      .on("value", (productSnapshot) => {
        if (productSnapshot.exists()) {
          setProduct(ObjectifyCamelCase(productSnapshot.val()));
        }
      });
  }, [id]);

  const cartClickHandler = () => {
    dispatch(cartActions.addToCart({ id: id, product: product }));
  };

  return (
    <section style={{ marginTop: "4rem" }}>
      {product ? (
        <div className="row">
          <div className="col-md-6 mb-4">
            <div id="highlight">
              <h1 className="display-5">{product.cropName}</h1>
              <h2 className="display-6">Sold by {product.farmerName}</h2>
            </div>
            <div id="info" className="my-4" style={{ fontSize: "1.5rem" }}>
              <p className="my-2">
                <strong>Price:</strong>
                <span> &#8377;{product.price}/kg</span>
              </p>
              <p className="my-2">
                <strong>Quantity:</strong>
                <span> {product.quantity} kg</span>
              </p>
            </div>
            <button
              onClick={cartClickHandler}
              className="btn btn-success"
              style={{
                display: user.category === "consumer" ? "block" : "none",
              }}
              disabled={isAddedToCart !== undefined}
            >
              {isAddedToCart === undefined ? (
                "Add to cart"
              ) : (
                <span>
                  <i className="fas fa-check"></i> Added to cart
                </span>
              )}
            </button>
          </div>
          <div className="col-md-6">
            <h2 id="highlight" className="display-6">
              Top reviews for {product.farmerName}'s products
            </h2>
            <div id="info" className="my-4">
              <p>No reviews found</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h3>Loading, please wait...</h3>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default withAuth(ProductDetails);
