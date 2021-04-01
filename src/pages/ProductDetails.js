import React from 'react';
import firebase from 'firebase';

class ProductDetails extends React.Component{
  state = {
    buyerEmail: '',
    buyerName: '',
    buyingStatus: '',
    price: null,
    farmerName: '',
    farmerEmail: '',
    crop: '',
    quantity_kg: null,
    cropCategory: ''
  }

  componentDidMount() {
    let productId = this.props.match.params.id;
    firebase.database().ref("product/" + productId).on('value', (doc) => {
      this.setState({
        price: `${doc.val().price}/Kg`,
        farmerName: doc.val().farmerName,
        farmerEmail: doc.val().farmerEmail,
        crop: doc.val().crop,
        quantity_kg: doc.val().quantity_kg
      });
      document.title = `${this.state.crop} | Krishi Mart`;
      if(doc.val().quantity_kg <= 10) {
        this.setState({cropCategory: 'Price fixed at'});
      } else {
        this.setState({cropCategory: 'Current bid at'})
      }
      if(doc.val().buyerName) {
        this.setState({
          buyingStatus: `Current bid by ${doc.val().buyerName}`,
          buyerEmail: doc.val().buyerEmail,
          buyerName: doc.val().buyerName
        })
      }
    });
  }

  render() {
    return(
      <div id="product-details" className="row">
        <div>
          <h2>{this.state.crop}</h2>
          <p>Sold by {this.state.farmerName}</p>
          <p>{this.state.quantity_kg} Kg - {this.state.cropCategory} - Rs {this.state.price}</p>
          <p>{this.state.buyingStatus}</p>
        </div>
      </div>
    );
  }
}

export default ProductDetails;