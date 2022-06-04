import React from "react";
import { useHistory } from "react-router-dom";

const ProductItem = (props) => {
  const history = useHistory();

  const cardClickHandler = () => {
    history.push("product/" + props.id);
  }

  return (
    <div className="col-sm-3 cursor-pointer">
      <div className="card my-1" onClick={cardClickHandler}>
        <div className="card-body gap-4">
          <h3 className="card-title fw-bold">{props.cropName}</h3>
          {props.userCategory === "consumer" && (
            <h5 className="card-subtitle mb-1">Sold by {props.farmerName}</h5>
          )}
          <p className="card-text mb-1">Quantity: {props.quantity} kg</p>
          <p className="card-text mb-1">Price: &#8377; {props.price}/kg</p>
        </div>
      </div>
    </div>
  )
}

export default ProductItem;