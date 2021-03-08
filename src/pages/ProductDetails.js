import React from 'react';
import firebase from 'firebase';

class ProductDetails extends React.Component{
  state = {
    buyer: null,
    price: null,
    farmer: null,
    crop: null,
    quantity_kg: null,
    cropCategory: null
  }

  componentDidMount() {
    let productId = this.props.match.params.id;
    firebase.firestore().collection("product").doc(`${productId}`).onSnapshot((doc) => {
      this.setState({
        price: `${doc.data().price}/Kg`,
        farmer: doc.data().farmer,
        crop: doc.data().crop,
        quantity_kg: doc.data().quantity_kg
      });
      document.title = `${this.state.crop} | Krishi Mart`;
      if(doc.data().quantity_kg <= 10) {
        this.setState({cropCategory: 'Price fixed at'});
      } else {
        this.setState({cropCategory: 'Current bid at'})
      }
      if(doc.data().buyer) {
        this.setState({buyer: `Current bid by ${doc.data().buyer}`})
      }
    });
  }

  render() {
    return(
      <div id="product-details" className="row">
        <img className="col-md-6" src="https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
        <div className="col-md-6">
          <h2>{this.state.crop}</h2>
          <p>Sold by {this.state.farmer}</p>
          <p>{this.state.quantity_kg} Kg - {this.state.cropCategory} - Rs {this.state.price}</p>
          <p>{this.state.buyer}</p>
        </div>
      </div>
    );
  }
}

export default ProductDetails;