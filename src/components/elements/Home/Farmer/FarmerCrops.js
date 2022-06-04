import React from "react";

import ProductItem from "components/elements/Products/ProductItem";
import Modal from "components/UI/Modal/Modal";
import AddCropForm from "./AddCropForm/AddCropForm";

const FarmerCrops = (props) => {
  return (
    <React.Fragment>
      <div className="container">
        <h2 id="highlight" className="display-6 my-2">
          Your products
        </h2>
        <div className="row">
          {props.products.length > 0 ? (
            props.products.map((product) => (
              <ProductItem key={product.id} {...product} />
            ))
          ) : (
            <div className="text-center">
              <h3>Loading, please wait...</h3>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {props.isAddingCrops && (
        <Modal onClose={props.onCloseModal}>
          <AddCropForm
            farmer={props.farmer}
            onClose={props.onCloseModal}
            onSuccess={props.onCropsAdded}
          />
        </Modal>
      )}
      {props.cropAdded && (
        <Modal onClose={props.onCloseCropsModal}>
          <div className="card text-center">
            <div className="card-header">Success</div>
            <div className="card-body">
              <div className="card-text display-1 text-success">
                <i className="far fa-check-circle"></i>
              </div>
              <h5 className="card-title mb-4">Crops added successfully!</h5>
              <button
                onClick={props.onCloseCropsModal}
                className="btn btn-outline-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default FarmerCrops;
