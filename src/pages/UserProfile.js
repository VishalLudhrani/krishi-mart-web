import React from 'react';
import firebase from 'firebase';

class UserProfile extends React.Component {
	
	state = {
		userName: '',
    email: '',
		category: '',
		phNo: null,
		address: '',
		dataStatus: 'Loading...'
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				this.setState({
					userName: user.displayName,
					email: user.email,
					dataStatus: ''
				})
			} else {
				this.setState({
					dataStatus: 'Loading...'
				})
			}
		})
	}

	render() {
		return(
			<div>
				<div id="product-details" className="row">
					<img className="col-sm-4" src="https://www.flaticon.com/svg/vstatic/svg/848/848006.svg?token=exp=1616830677~hmac=c72242cc9aab76b7b770e10533c1f462" width="128" height="128" />
					<div className="col-sm-8">
						<p>
							{this.state.userName}
						</p>
					</div>
				</div>
			</div>
		)
	}

}

export default UserProfile;