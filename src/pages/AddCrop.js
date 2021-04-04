import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

const currentTimestamp = Date.now();

class AddCrop extends React.Component {

	state = {
		crop: '',
		price: '',
		quantity_kg: '',
		buyerEmail: '',
		buyerName: '',
		farmerEmail: '',
		farmerName: '',
		rating: '',
		review: '',
		formStyle: '',
		loggedInUserCategory: '',
		farmerPhNo: null,
		cropID: '',
		btn: (
			<input type="submit" className="customBtn" value="Upload" />
		)
	}

	componentDidMount() {
		var mql = window.matchMedia("screen and (max-width: 576px)");
		let userCategory = '';
    this.formStyle(mql)
    mql.addEventListener('change', this.formStyle);

		firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				// user is logged in
				firebase.database().ref('user/').on('value', (snapshot) => {
          let userdb = [];
					let farmerPh;
          snapshot.forEach((doc) => {
            userdb = userdb.concat(doc.val());
          })
          // check for user category, let the farmer in, and prevent consumers from entering here
          for(let u of userdb) {
            if(u.category === 'farmer' && u.email === user.email) {
              userCategory = 'farmer';
							farmerPh = u.phNo
              break;
            }
            if(u.category === 'consumer' && u.email === user.email) {
              userCategory = 'consumer';
              break;
            }
          }
					// render the content on the webpage as per the user category; if user isn't logged in redirect them to login page
					if(userCategory === 'farmer') {
						this.setState({
							farmerEmail: user.email,
							farmerName: user.displayName,
							loggedInUserCategory: 'farmer',
							farmerPhNo: farmerPh
						});
					}
        });
			}
		});
	}

	render() {

		let displayContent = (
			<div className="text-center">
				<div className="spinner-border" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
				<h3>Please wait...</h3>
			</div>
		)

		if(this.state.loggedInUserCategory) {
			if(this.state.loggedInUserCategory === 'farmer') {
				displayContent = (
					<div>
						<h1 id="highlight" style={{marginTop: '5%'}}>Add your crop details here..</h1>
						<br />
						<form onSubmit={this.handleSubmit}>
							<label>Enter Crop Name
								<br />
								<input type="text" name="crop" placeholder="eg: HMT Rice, Masoor Dal" value={this.state.crop} onChange={this.onCropChange} />
							</label>
							<br />
							<br />
							<label>Enter Crop Price
								<br />
								<input type="text" name="price" placeholder="in Rs./Kg" value={this.state.price} onChange={this.onPriceChange} />
							</label>
							<br />
							<br />
							<label>Enter Crop Quantity
								<br />
								<input type="text" name="quantity_kg" placeholder="in Kg" value={this.state.quantity_kg} onChange={this.onQuantityChange} />
							</label>
							<br />
							<br />
							{this.state.btn}
						</form>
					</div>
				)
			} else {
				displayContent = (
					<div id="highlight">
						<h2>Dear user, only farmers are allowed to upload crops..</h2>
						<p>Please return to <Link to="/home">home page</Link> to continue your experience!</p>
					</div>
				)
			}
		} else {
			displayContent = (
				<div className="col-md-6" id="highlight">
					<h2>Dear user, if you're a farmer, please <Link to="login">login</Link> to continue..</h2>
				</div>
			)
		}

		return(
			<div id="info" className="row">
				<div className={this.state.formStyle}>
					{displayContent}
				</div>
				<div className="col-md-6">
					<img src="./images/add-crop.svg" />
				</div>
			</div>
		)
	}

	onCropChange = (e) => {
		this.setState({
			crop: e.target.value
		})
	}

	onPriceChange = (e) => {
		this.setState({
			price: e.target.value
		})
	}

	onQuantityChange = (e) => {
		this.setState({
			quantity_kg: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({
			cropID: this.state.farmerPhNo + this.state.crop.replace(/ /g, '').toLowerCase() + currentTimestamp,
			btn: (
				<button class="btn btn-primary" type="button" style={{backgroundColor: '#49A078'}} disabled>
					<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
					Uploading...
				</button>
			)
		})
		setTimeout(() => {
			firebase.database().ref('product/' + this.state.cropID).set({
				crop: this.state.crop,
				price: this.state.price,
				quantity_kg: this.state.quantity_kg,
				farmerName: this.state.farmerName,
				farmerEmail: this.state.farmerEmail
			}).then(() => {
				this.setState({
					btn: (
						<div>
							<input type="submit" value="Uploaded!" /> <i class="fas fa-check"></i>
						</div>
					)
				})
				this.props.history.push('/home')
			})
		}, 1000);
	}

	formStyle = (e) => {
    if(e.matches){
      this.setState({
        formStyle: 'content col-md-6',
      });
      console.log();
    }
    else{
      this.setState({
        formStyle: 'col-md-6',
      })
    }
  }
}

export default AddCrop;