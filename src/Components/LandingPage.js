import React from "react";

const LandingPage = (props) => {
  return (
    <div className="row heroSection">
      <div className="col-sm-6">
        <h3 id="highlight" className="heroTitle">
          Khet Se Ghar Tak
        </h3>
        <div id="info">
          <p className="heroText">
            Providing you fresh, and organic vegetables.. Straight from the farm!
          </p>
          <button className="customBtn" onClick={props.onSignup}>
            Login
          </button>
          <br />
          <br />
          <button className="customBtnSecondary" onClick={props.onSignup}>
            Register
          </button>
        </div>
      </div>
      <div className="col-sm-6">
        <img
          className="heroImg"
          src="./images/farmerlandingpage.svg"
          alt="Farmer with a hen in his hand, smiling."
        />
      </div>
    </div>
  );
};

export default LandingPage;
