import React, { useState, useEffect } from "react";
import firebase from "firebase";

import useUser from "../../hooks/useUser";
import Modal from "../UI/Modal/Modal";
import AddCropForm from "./AddCropForm";

const FarmerHomePage = () => {
  const [products, setProducts] = useState([]);
  const [isAddingCrops, setIsAddingCrops] = useState(false);

  const { user: farmer } = useUser();

  // useEffect(() => {
  //   if (farmer) {
  //     firebase
  //       .database()
  //       .ref("products/")
  //       .on("value", (productsSnapshot) => {
  //         console.log(productsSnapshot.val());
  //       })
  //   }
  // }, [farmer]);

  const closeModalHandler = () => {
    setIsAddingCrops(false);
  };

  const openModalHandler = () => {
    setIsAddingCrops(true);
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
      <div id="highlight" className="container">
        Farmer crops go here.
      </div>
      {isAddingCrops && (
        <Modal onClose={closeModalHandler}>
          <AddCropForm farmer={farmer} onClose={closeModalHandler} />
        </Modal>
      )}
    </div>
  );
};

export default FarmerHomePage;
