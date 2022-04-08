import React from "react";

const ProductItem = (props) => {
  return (
    <div className="col-sm-3">
      <div className="card m-2">
        <div className="card-body">
          <h5 className="card-title">{props.cropName}</h5>
          {props.userCategory === "consumer" && (
            <p className="card-subtitle mb-0">by {props.farmerName}</p>
          )}
          <p className="card-text mb-0">Quantity: {props.quantity} kg</p>
          <p className="card-text mb-0">Price: &#8377; {props.price}/kg</p>
        </div>
      </div>
    </div>
  )
}

export default ProductItem;