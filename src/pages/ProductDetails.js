import React from 'react';
import firebase from 'firebase';

class ProductDetails extends React.Component{
  state = {
    buyer: null,
    price: null,
    farmer: null,
    crop: null,
    quantity_kg: null
  }

  componentDidMount() {
    let productId = this.props.match.params.id;
    firebase.firestore().collection("product").doc(`${productId}`).onSnapshot((doc) => {
      this.setState({
        buyer: doc.data().buyer,
        price: doc.data().price,
        farmer: doc.data().farmer,
        crop: doc.data().crop,
        quantity_kg: doc.data().quantity_kg
      });
      document.title = `Krishi Mart | ${this.state.crop}`;
    });
  }

  render() {
    return(
      <div className="content">
        <p><strong>Crop name: </strong>{this.state.crop}</p>
        <p><strong>Farmer name: </strong>{this.state.farmer}</p>
        <p><strong>Quantity: </strong>{this.state.quantity_kg} Kg</p>
        <p><strong>Current Bid: </strong>Rs {this.state.price}</p>
        <p><strong>Buyer: </strong>{this.state.buyer}</p>
      </div>
    );
  }
}

export default ProductDetails;