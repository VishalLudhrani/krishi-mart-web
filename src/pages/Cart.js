import React from 'react';
import firebase from 'firebase';
import { withRouter, Link } from 'react-router-dom';

class Cart extends React.Component {

	state = {
		userName: '',
		userEmail: '',
		userCart: '',
		isLoading: true,
		products: [],
		productsKeys: [],
		userPh: '',
		purchaseMethod: ''
	}

	componentDidMount() {
		document.title = "My Cart | Krishi Mart"
		// get the current user
		firebase.auth().onAuthStateChanged((user) => {
			// if user exists, let them in, else follow them up until they login
			if(user) {
				this.setState({
					userName: user.displayName,
					userEmail: user.email
				})
				// match the user in the database, and check if he/she is a farmer/consumer
				firebase.database().ref('user/').on('value', (snapshot) => {
					let userdb = [];
					if(snapshot.exists()) {
						snapshot.forEach((doc) => {
							userdb = userdb.concat(doc.val());
						});
						// farmer goes to home page, and consumer stays
						for(let u of userdb) {
							if(u.category === 'farmer' && u.email === user.email) {
								alert("Dear user, Farmers can't have a cart, please head to the home page");
								this.props.history.push('/home');
							}
							if(u.category === 'consumer' && u.email === user.email) {
								this.setState({
									userCart: u.cart,
									isLoading: false,
									userPh: u.phNo
								});
								break;
							}
						}
					}
					// get the products that the user possesses in their cart
					const productRef = firebase.database().ref('product/');
					if(this.state.userCart) {
						let cartItems = Object.values(this.state.userCart);
						let productsArray = [];
						let productKeysArray = [];
						for(let cartItem of cartItems) {
							productRef.child(cartItem.productID).once('value').then((productSnapshot) => {
								productsArray.push(productSnapshot.val());
								productKeysArray.push(productSnapshot.key);
								this.setState({
									products: productsArray,
									productsKeys: productKeysArray
								})
							});
						}
					}
				})
			} else {
				alert("Oops! Seems like you're logged out...\nPlease login to continue.");
				this.props.history.push('/home');
			}
		});
	}

	componentWillUnmount() {
		firebase.database().ref('user/').off();
		firebase.database().ref('product/').off();
	}

	render() {
		let cartContent = (
			<div id="info" className="content">
				<div className="spinner-border" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
				<h3>Loading, please wait...</h3>
			</div>
		)
		if((!this.state.isLoading) && this.state.products.length) {
			cartContent = (
				this.state.products.map((product, pos) => {
					return(
						<div id="info" key={pos}>
							<hr />
							<h2 id="highlight">{product.crop}</h2>
							<p>Sold By {product.farmerName} at &#8377;{product.price}/Kg</p>
							<p>Quantity: {product.quantity_kg} Kg</p>
							<p>Total amount: &#8377;{product.quantity_kg*product.price}</p>
							<h4 id="highlight">Please select your purchase method</h4>
							<div onChange={this.handlePurchase}>
								<input name="purchase" type="radio" value="delivery" /> Home Delivery
								<br />
								<input name="purchase" type="radio" value="pickup" /> Pick up at Farmer's place
							</div>
							<button className="customBtn" style={{borderRadius: '10px', margin: '10px auto'}} onClick={() => this.buyProduct(pos)}>Buy</button>
							<button className="customBtnSecondary" style={{borderRadius: '10px', margin: '10px'}} onClick={() => this.delete(pos)}><i className="far fa-trash-alt"></i> Delete item</button>
						</div>
					)
				})
			)
		} else if((!this.state.isLoading) && (!this.state.products.length)) {
			cartContent = (
				<div id="info" className="content">
					<h2>Your cart is empty..</h2>
					<p>Would you like to <Link to='/home' style={{color: '#49A078'}}>search</Link> for groceries?</p>
					<div className="row">
						<div className="col-sm-3"></div>
						<div className="col-sm-6">
							<img src="./images/farmercropsnotfound.svg" alt="farmer with cart" />
						</div>
						<div className="col-sm-3"></div>
					</div>
				</div>
			)
		}

		return(
			<div>
				<h1 id="highlight" className="content">My Cart</h1>
				{cartContent}
			</div>
		)
	}

	buyProduct = (productPosition) => {
		let itemsLength = this.state.products.length;
		let productID = this.state.productsKeys[productPosition];
		let cartArray = Object.entries(this.state.userCart);
		const currentTimestamp = Date.now();
		// update user details on the product db
		firebase.database().ref('product/' + productID).update({
			buyerName: this.state.userName,
			buyerEmail: this.state.userEmail,
			purchaseMode: this.state.purchaseMethod,
			purchaseTime: currentTimestamp
		}, (error) => {
			if(error) {
				alert(`An error occured.\n${error}`)
			} else {
				// delete item from user's cart
				this.deleteProduct(this.state.userPh, cartArray[productPosition][0]);
				alert("Your purchase was successful.");
				this.props.history.push('user-profile');
			}
		})
	}

	deleteProduct = (userPh, cartID) => {
		firebase.database().ref('user/' + userPh + '/cart/' + cartID).remove();
	}
	
	delete = (productPosition) => {
		let itemsLength = this.state.products.length;
		let cartArray = Object.entries(this.state.userCart);
		let itemsPosition = itemsLength - productPosition - 1;
		this.deleteProduct(this.state.userPh, cartArray[itemsPosition][0]);
		alert("Product removed from your cart.");
		window.location.reload();
	}

	handlePurchase = (e) => {
		this.setState({purchaseMethod: e.target.value})
	}

}

export default withRouter(Cart);