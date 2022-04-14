import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/database";
import { ObjectifyCamelCase } from "../../utils/ObjectifyCamelCase";
import useUser from "../../hooks/useUser";
import withAuth from "../../guards/with-auth";

const ProductDetails = (props) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [userCategory, setUserCategory] = useState("");
  const { user } = useUser();

  useEffect(() => {
    firebase
      .database()
      .ref("products/" + id)
      .on("value", (productSnapshot) => {
        if (productSnapshot.exists()) {
          setProduct(ObjectifyCamelCase(productSnapshot.val()));
        }
      });
    
    if (user) {
      firebase
        .database()
        .ref("users/" + user.uid)
        .on("value", (userSnapshot) => {
          if (userSnapshot.exists()) {
            setUserCategory(userSnapshot.val()["user_category"]);
          }
        })
    }
  }, [id, user]);

  return (
    <section style={{marginTop: '4rem'}}>
      {product ? (
        <div className="row">
          <div className="col-md-6 mb-4">
            <div id="highlight">
              <h1 className="display-5">{product.cropName}</h1>
              <h2 className="display-6">Sold by {product.farmerName}</h2>
            </div>
            <div id="info" className="my-4" style={{fontSize: '1.5rem'}}>
              <p className="my-2">
                <strong>Price:</strong>
                <span> &#8377;{product.price}/kg</span>
              </p>
              <p className="my-2">
                <strong>Quantity:</strong>
                <span> {product.quantity} kg</span>
              </p>
            </div>
            <button className="btn btn-success" style={{display: userCategory === "consumer" ? 'block' : 'none'}}>Add to cart</button>
          </div>
          <div className="col-md-6">
            <h2 id="highlight" className="display-6">Top reviews for {product.farmerName}'s products</h2>
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
