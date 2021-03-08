import React from 'react';
import { withRouter } from 'react-router-dom'

class ProductItem extends React.Component {
  render() {
    let product = this.props.product.data();
    return(
      <div onClick={this.onClick} className="productList cursor-pointer">
        <p><strong>Crop name: </strong>{product.crop}</p>
        <p><strong>Quantity: </strong>{product.quantity_kg} Kg</p>
        <p><strong>Price: </strong>Rs. {product.price}</p>
      </div>
    );
  }

  onClick = () => {
    let id = this.props.product.id;
    this.props.history.push('/product/'+id);
  }
}

export default withRouter(ProductItem);