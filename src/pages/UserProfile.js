import React from 'react';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';

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
		purchaseHistoryStyle: ''
	}

	componentDidMount() {
		document.title = "Krishi Mart";
		var mql = window.matchMedia("screen and (max-width: 576px)");
    this.pageStyle(mql)
    mql.addEventListener('change', this.pageStyle);
		firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				document.title = `${user.displayName} | Krishi Mart`;
				this.setState({
					userName: user.displayName,
					email: user.email,
					dataStatus: ''
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
					snapshot.forEach((doc) => {
						if(doc.val().buyerEmail === this.state.email) {
							product = product.concat(doc.val());
						}
					});
					this.setState({products: product});
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

	render() {
		return(
			<div>
				<div id="product-details" className={this.state.pageStyle}>
					<img className="col-sm-4" src="https://www.flaticon.com/svg/vstatic/svg/848/848006.svg?token=exp=1616830677~hmac=c72242cc9aab76b7b770e10533c1f462" width="128" height="128" />
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
										<div>
											<p>Crop: {product.crop}</p>
											<p>Quantity: {product.quantity_kg} Kg</p>
											<p>Price: {product.price}/Kg</p>
											<p>Sold by: {product.farmerName} ({product.farmerEmail})</p>
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

}

export default withRouter(UserProfile);