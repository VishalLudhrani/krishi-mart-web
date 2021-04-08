import React from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase';

class ProductItem extends React.Component {

  state = {
    reviewPos: '',
  }

  componentDidMount() {
    let farmer = this.props.product.val().farmerEmail;
    firebase.database().ref('user').on('value', (userSnapshot) => {
      userSnapshot.forEach((user) => {
        if(user.val().email === farmer) {
          this.setState({
            reviewPos: user.val().percentPositiveReview.toFixed(2)
          });
        }
      })
    })
  }

  componentWillUnmount() {
    firebase.database().ref('user/').off();
  }

  render() {
    let product = this.props.product.val();
    let reviewPosBadge = (
      <span className="badge bg-success">{this.state.reviewPos}% positive reviews</span>
    );
    return(
      <div onClick={this.onClick} className="productList cursor-pointer" style={{margin: '2%'}}>
        <p><strong>Crop name: </strong>{product.crop}</p>
        <p><strong>Quantity: </strong>{product.quantity_kg} Kg</p>
        <p><strong>Price: </strong>Rs. {product.price}/Kg</p>
        {reviewPosBadge}
      </div>
    );
  }

  onClick = () => {
    let id = this.props.product.key;
    this.props.history.push('/product/'+id);
  }
}

export default withRouter(ProductItem);