import React from 'react';
import firebase from 'firebase';

class AddCrop extends React.Component {

	componentDidMount() {
		var mql = window.matchMedia("screen and (max-width: 576px)");
    this.formStyle(mql)
    mql.addEventListener('change', this.formStyle);
	}
	
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
		formStyle: ''
	}

	render() {
		return(
			<div id="info" className="row">
				<div className="col-md-6">
					<h1 id="highlight" style={{marginTop: '5%'}}>Add your crop details here..</h1>
					<br />
					<form onSubmit={this.handleSubmit} className={this.state.formStyle}>
						<label>Enter Crop Name
							<br />
							<input type="text" name="crop" placeholder="For example: HMT Rice, Masoor Dal, etc." value={this.state.crop} onChange={this.onCropChange} />
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
						<input type="submit" className="customBtn" defaultValue="Upload" />
					</form>
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
		console.log(this.state);
	}

	formStyle = (e) => {
    if(e.matches){
      this.setState({
        formStyle: 'content',
      });
      console.log();
    }
    else{
      this.setState({
        formStyle: '',
      })
    }
  }
}

export default AddCrop;