import React from 'react';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';

const vader = require('vader-sentiment');

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
    cropCategory: '',
    buyBtnStyle: 'display-none',
    review: '',
    reviewFormStyle: 'display-none',
    productID: '',
    reviewTop: [],
    reviewPositivity: 'Calculating the'
  }

  componentDidMount() {
    let productId = this.props.match.params.id;
    this.setState({productID: productId})
    // get the crop details from database
    firebase.database().ref("product/" + productId).on('value', (doc) => {
      this.setState({
        price: `${doc.val().price}/Kg`,
        farmerName: doc.val().farmerName,
        farmerEmail: doc.val().farmerEmail,
        crop: doc.val().crop,
        quantity_kg: doc.val().quantity_kg
      });
      document.title = `${doc.val().crop} | Krishi Mart`;
      if(doc.val().quantity_kg <= 15) {
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
    // check for user category, if it's farmer, let him see just the details; if it's consumer, display the option to buy
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        buyerEmail: user.email,
        buyerName: user.displayName
      })
      firebase.database().ref('user/').on('value', (snapshot) => {
        let userdb = [];
        snapshot.forEach((doc) => {
          userdb = userdb.concat(doc.val());
        });
        for(let u of userdb) {
          if(u.category === 'farmer' && u.email === user.email) {
            this.setState({buyBtnStyle: 'display-none'});
          }
          if(u.category === 'consumer' && u.email === user.email) {
            this.setState({buyBtnStyle: 'display-block customBtn'})
          }
        }
      })
    });

    
  }

  render() {
    let reviewString = '';
    let review = [];
    let intensity;
    let reviewPositivity;
    firebase.database().ref('product').on('value', (snapshot) => {
      snapshot.forEach((doc) => {
        if(this.state.farmerEmail === doc.val().farmerEmail) {
          if(doc.val().review) {
            reviewString += doc.val().review;
            review.push(doc.val().review);
          }
        }
      });
      if(reviewString) {
        intensity = vader.SentimentIntensityAnalyzer.polarity_scores(reviewString);
        reviewPositivity = intensity.pos * 100;
      }
    })
    return(
      <div id="product-details" style={{fontSize: '1.25em'}}>
        <div className="row">
          <div id="info" className="col-md-6">
            <h2 id="highlight">{this.state.crop}</h2>
            <p>Sold by {this.state.farmerName}</p>
            <p>Quantity: {this.state.quantity_kg} Kg</p>
            <p>{this.state.cropCategory} Rs. {this.state.price}</p>
            <p>{this.state.buyingStatus}</p>
            <p>{reviewPositivity} % positive reviews</p>
            <button className={this.state.buyBtnStyle} style={{borderRadius: '14px'}} onClick={this.onBuyCrop}>Buy</button>
          </div>
          <div id="info" className="col-md-6">
            <h4 className="content" id="highlight">Top reviews about {this.state.farmerName}'s products</h4>
            {
              review.map((rev, pos) => {
                return(
                  <div>
                    <p>{rev}</p>
                    <hr />
                    <br />
                  </div>
                )
              })
            }
          </div>
        </div>
        <div id="info" className={this.state.reviewFormStyle} style={{marginTop: '5%'}}>
          <h3 id="highlight">Please leave a review for {this.state.farmerName}!</h3>
          <form onSubmit={this.onReviewSubmit}>
            <textarea style={{width: '100%', height: 'auto'}} value={this.state.review} onChange={this.handleReviewChange} placeholder="example: Fresh quality"></textarea>
            <br />
            <br />
            <input type="submit" className="customBtn" />
          </form>
        </div>
      </div>
    );
  }

  onBuyCrop = () => {
    this.setState({
      reviewFormStyle: 'row content display-block'
    });
    // set the buyer details in the database
    firebase.database().ref('product/' + this.state.productID).update({
      buyerEmail: this.state.buyerEmail,
      buyerName: this.state.buyerName
    });
    alert("Order successful!\nPlease make sure you review the farmer!");
  }

  onReviewSubmit = (e) => {
    e.preventDefault();
    // set the review
    firebase.database().ref('product/' + this.state.productID).update({
      review: this.state.review
    });
    if(this.state.review) {
      alert("Thank you for adding a review..!\nWe hope you enjoyed shopping with Krishi Mart!😇")
    }
    this.props.history.push('/home');
  }

  handleReviewChange = (e) => {
    this.setState({
      review: e.target.value
    });
  }
}

export default withRouter(ProductDetails);