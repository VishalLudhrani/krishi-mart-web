const CartItem = (props) => {
  const removeItemFromCartHandler = () => {
    props.onRemoveItemFromCart(props.item.id);
  }

  return (
    <li className="list-group-item my-1 rounded" id="list-item">
      <h2 className="mb-2">{props.item.cropName}</h2>
      <div className="d-flex justify-content-between">
        <div>
          <p className="mb-1">
            <span className="fw-bold">Sold by:</span> {props.item.farmerName}
          </p>
          <p className="mb-1">
            <span className="fw-bold">Price:</span> &#8377;{props.item.price}/kg
          </p>
          <p className="mb-1">
            <span className="fw-bold">Quantity:</span> {props.item.quantity} kg
          </p>
        </div>
        <div>
          <p className="mb-1">
            <span className="fw-bold">Total amount:</span> &#8377;
            {props.item.quantity * props.item.price}
          </p>
          <button className="btn btn-link link-danger" onClick={removeItemFromCartHandler}>Remove from cart</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
