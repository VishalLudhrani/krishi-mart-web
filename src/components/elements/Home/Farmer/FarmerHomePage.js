import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/database";

import useUser from "hooks/useUser";
import FarmerCrops from "./FarmerCrops";
import { ObjectifyCamelCase } from "utils/ObjectifyCamelCase";

const FarmerHomePage = () => {
  const [products, setProducts] = useState([]);
  const [isAddingCrops, setIsAddingCrops] = useState(false);
  const [cropAdded, setCropAdded] = useState(false);

  const { data: farmer } = useUser();

  useEffect(() => {
    if (farmer) {
      firebase
        .database()
        .ref("products/")
        .orderByChild("farmer_email")
        .equalTo(farmer.email)
        .on("value", (productsSnapshot) => {
          if (productsSnapshot.hasChildren()) {
            let productDB = productsSnapshot.val();
            let fetchedProducts = [];
            for (const key in productDB) {
              const item = productDB[key];
              const productObjectified = ObjectifyCamelCase(item);
              fetchedProducts.push({
                id: key,
                ...productObjectified,
              });
            }
            setProducts(fetchedProducts);
          }
        });
    }
  }, [farmer]);

  const closeModalHandler = () => {
    setIsAddingCrops(false);
  };

  const openModalHandler = () => {
    setIsAddingCrops(true);
  };

  const cropAddedSuccessHandler = () => {
    setCropAdded(true);
  };

  const closeCropModalHandler = () => {
    setCropAdded(false);
  };

  return (
    <div className="row">
      <button
        className="btn btn-outline-success"
        type="button"
        style={{ width: "75%", margin: "10px auto" }}
        onClick={openModalHandler}
      >
        Add Crop
      </button>
      <br />
      <section id="info">
        <FarmerCrops
          products={products}
          isAddingCrops={isAddingCrops}
          cropAdded={cropAdded}
          onCloseModal={closeModalHandler}
          onCloseCropsModal={closeCropModalHandler}
          onCropAdded={cropAddedSuccessHandler}
        />
      </section>
    </div>
  );
};

export default FarmerHomePage;
