import React from 'react';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';

const mql = window.matchMedia("screen and (max-width: 576px)");

class UserProfile extends React.Component {
	
	state = {
		userName: '',
    email: '',
		category: '',
		phNo: null,
		address: '',
		dataStatus: 'Loading...',
		pageStyle: 'row',
		products: [],
		userCategory: '',
		purchaseHistoryStyle: '',
		productsKeys: [],
		userPhotoUrl: ''
	}

	componentDidMount() {
		document.title = "Krishi Mart";
    this.pageStyle(mql)
    mql.addEventListener('change', this.pageStyle);
		firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				document.title = `${user.displayName} | Krishi Mart`;
				this.setState({
					userName: user.displayName,
					email: user.email,
					dataStatus: '',
					userPhotoUrl: user.photoURL
				})
				firebase.database().ref('user/').on('value', (snapshot) => {
					let loggedInUser;
					let userdb = [];
          snapshot.forEach((doc) => {
            userdb = userdb.concat(doc.val());
          })
					for(let u of userdb) {
						if(u.email === user.email) {
							loggedInUser = u;
						}
					}
					this.setState({
						phNo: loggedInUser.phNo,
						address: loggedInUser.address,
						userCategory: loggedInUser.category
					})
				})
				firebase.database().ref('product/').on('value', (snapshot) => {
					let product = [];
					let productKeys = [];
					snapshot.forEach((doc) => {
						if(doc.val().buyerEmail === this.state.email) {
							product = product.concat(doc.val());
							productKeys = productKeys.concat(doc.key);
						}
					});
					this.setState({
						products: product,
						productsKeys: productKeys
					});
				})
			} else {
				this.setState({
					dataStatus: 'Loading...'
				})
				this.props.history.push('/home');
			}
			if(this.state.userCategory) {
				if(this.state.userCategory === 'farmer') {
					this.setState({purchaseHistoryStyle: 'display-none'});
				} else {
					this.setState({purchaseHistoryStyle: 'display-block'});
				}
			}
		});
	}

	componentWillUnmount() {
		firebase.database().ref('product/').off();
		firebase.database().ref('user/').off();
		mql.removeEventListener('change', this.pageStyle);
	}

	render() {
		return(
			<div>
				<div id="product-details" className={this.state.pageStyle}>
					<div className="col-sm-4">
						<img src={this.state.userPhotoUrl} style={{borderRadius: '50%', width: '50%', height: 'auto'}} />
					</div>
					<div className="col-sm-8" style={{padding: '10px'}}>
						<p>{this.state.userName}</p>
						<p><i className="fas fa-phone-alt"></i> {this.state.phNo}</p>
						<p><i className="fas fa-at"></i> {this.state.email}</p>
						<button className="customBtn" style={{borderRadius: '10px'}} onClick={this.onEditProfile}><i className="fas fa-pen"></i> Edit</button>
					</div>
				</div>
				<br />
				<div className={this.state.pageStyle}>
					<div className={this.state.purchaseHistoryStyle}>
						<h4 style={{textAlign: 'center'}}>Your purchase history</h4>
						<hr />
						<br />
						<div>
							{
								this.state.products.map((product, pos) => {
									return(
										<div id="info" key={pos} onClick={() => this.onVisitProduct(pos)} className="cursor-pointer">
											<p>Crop: {product.crop}</p>
											<p>Quantity: {product.quantity_kg} Kg</p>
											<p>Price: {product.price}/Kg</p>
											<p>Sold by: {product.farmerName} ({product.farmerEmail})</p>
											<p>Amount Paid: &#8377;{product.quantity_kg * product.price}</p>
											<div>
												{product.review ? <p></p> : <p className="alert alert-warning" role="alert">Dear user, reviewing this product is pending.<br />Click here to add a review</p>}
											</div>
											<hr />
										</div>
									)
								})
							}
						</div>
					</div>
				</div>
			</div>
		)
	}

	pageStyle = (e) => {
		if(e.matches) {
			this.setState({pageStyle: 'row content'});
		} else {
			this.setState({pageStyle: 'row'});
		}
	}

	onEditProfile = () => {
		this.props.history.push('/update-profile')
	}

	onVisitProduct = (position) => {
		this.props.history.push('/product/' + this.state.productsKeys[position]);
	}

}

export default withRouter(UserProfile);