import React from 'react';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';

const vader = require('vader-sentiment');
const currentTimestamp = Date.now();
const mql = window.matchMedia("screen and (max-width: 576px)");

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
    buyBtnContent: '',
    review: '',
    reviewFormStyle: 'display-none',
    productID: '',
    reviewTop: [],
    reviewPositivity: 'Calculating the',
    pageStyle: '',
    bidStatus: '',
    userName: '',
    userEmail: ''
  }

  componentDidMount() {
    this.pageStyle(mql)
    mql.addEventListener('change', this.pageStyle);

    let productId = this.props.match.params.id;
    this.setState({productID: productId})
    // get the crop details from database
    firebase.database().ref("product/" + productId).on('value', (doc) => {
      this.setState({
        price: doc.val().price,
        farmerName: doc.val().farmerName,
        farmerEmail: doc.val().farmerEmail,
        crop: doc.val().crop,
        quantity_kg: doc.val().quantity_kg
      });
      document.title = `${doc.val().crop} | Krishi Mart`;
      // set the crop purchase status based on the purchase/bidding history, and quantity
      // if quantity is less than 15kg, price is fixed; else it has to be auctioned
      if(doc.val().quantity_kg < 15) {
        this.setState({
          cropCategory: 'Price fixed at',
          buyBtnContent: 'Buy'
        });
        if(doc.val().buyerName) {
          this.setState({
            buyingStatus: `Bought by ${doc.val().buyerName}`,
            buyerEmail: doc.val().buyerEmail,
            buyerName: doc.val().buyerName
          })
        }
      } else {
        if(doc.val().buyerName) {
          this.setState({
            cropCategory: 'Current bid at',
            buyingStatus: `Current bid by ${doc.val().buyerName}`,
            buyerEmail: doc.val().buyerEmail,
            buyerName: doc.val().buyerName,
            buyBtnContent: 'Bid'
          })
        } else {
          this.setState({
            cropCategory: 'Bid starts at',
            buyBtnContent: 'Bid'
          })
        }
      }
    });
    // check for user category, if it's farmer, let him see just the details; if it's consumer, display the option to buy
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({
          userEmail: user.email,
          userName: user.displayName
        })
        firebase.database().ref('user/').on('value', (snapshot) => {
          let userdb = [];
          if(snapshot.exists()) {
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
          }
        })
      }
    });

    // check if it's the starting bid, if so, just update the buyer's name and email, and start the timer
    firebase.database().ref('product/' + productId).on('value', (productSnapshot) => {
      if(productSnapshot.val().buyerName) {
        // if the timer is on
        if(productSnapshot.val().bidEnds >= currentTimestamp) {
          //    if existing user's bid is present, disable bidding
          if(this.state.userEmail === productSnapshot.val().buyerEmail) {
            document.querySelector('#btn').disabled = true;
          } else {
            //    else increase the bid by 10 rupees and update the amount on button, reflect it on the database as well on button click
            document.querySelector('#btn').disabled = false;
            let cropPrice = productSnapshot.val().price + 10;
            let btnContent = `Bid Rs. ${cropPrice}/Kg`
            this.setState({
              buyBtnContent: btnContent,
              price: cropPrice
            })
          }
          this.setState({
            bidStatus: `Bid ends at ${new Date(productSnapshot.val().bidEnds).toLocaleString()}`,
          })
        } else {
          // else close the bid
          document.querySelector('#btn').disabled = true;
          this.setState({
            bidStatus: `Bid ended at ${new Date(productSnapshot.val().bidEnds).toLocaleString()}`,
          })
        }
      }
    })
  }

  componentWillUnmount() {
    firebase.database().ref('product/').off();
    firebase.database().ref('product/').off();
    firebase.database().ref('user/').off();
    mql.removeEventListener('change', this.pageStyle);
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
            if(review.length <= 3) {
              review.push({
                buyerName: doc.val().buyerName,
                buyerReview: doc.val().review
              });
            }
          }
        }
      });
      if(reviewString) {
        intensity = vader.SentimentIntensityAnalyzer.polarity_scores(reviewString);
        reviewPositivity = (intensity.pos * 100).toFixed(2);
      }
    })
    return(
      <div id="product-details" className={this.state.pageStyle} style={{fontSize: '1.25em'}}>
        <div className="row">
          <div id="info" className="col-md-6">
            <h2 id="highlight">{this.state.crop}</h2>
            <p>Sold by {this.state.farmerName}</p>
            <p>Quantity: {this.state.quantity_kg} Kg</p>
            <p>{this.state.cropCategory} Rs. {this.state.price}/Kg</p>
            <p>{this.state.bidStatus}</p>
            <p>{this.state.buyingStatus}</p>
            <p>{reviewPositivity} % positive reviews</p>
            <button id="btn" className={this.state.buyBtnStyle} style={{borderRadius: '14px'}} onClick={this.onBuyCrop}>{this.state.buyBtnContent}</button>
          </div>
          <div id="info" className="col-md-6">
            <h3 className="content" id="highlight">Top reviews about {this.state.farmerName}'s products</h3>
            {
              review.map((rev, pos) => {
                return(
                  <div key={pos}>
                    <p>{rev.buyerName ? rev.buyerName : "A user"} says "{rev.buyerReview}"</p>
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
    if(this.state.buyBtnContent === 'Buy') {
      this.setState({
        reviewFormStyle: 'row content display-block'
      });
      // set the buyer details in the database
      firebase.database().ref('product/' + this.state.productID).update({
        buyerEmail: this.state.buyerEmail,
        buyerName: this.state.buyerName
      });
      alert("Order successful!\nPlease make sure you review the farmer!");
    } else {
      let currentTime = Date.now();
      let bidShouldEnd = currentTime + 3600000;
      firebase.database().ref('product/' + this.props.match.params.id).update({
       price: this.state.price,
       buyerEmail: this.state.userEmail,
       buyerName: this.state.userName,
       bidEnds: bidShouldEnd
     })
     this.props.history.push('/user-profile')
    }
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

  pageStyle = (e) => {
    const btn = document.getElementById('btn');
    if(btn) {
      if(e.matches) {
        this.setState({pageStyle: 'content'});
        btn.classList.add('content');
      } else {
        this.setState({pageStyle: ''})
        btn.classList.remove('content');
      }
    }
  }
}

export default withRouter(ProductDetails);