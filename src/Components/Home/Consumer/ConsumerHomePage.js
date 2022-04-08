import React, { useState } from "react";

const ConsumerHomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [products, setProducts] = useState([]);

  const searchQueryHandler = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchProducts = () => {
    setLoading(true);
    console.log(searchQuery, "\nSearching");
    setLoading(false);
  };

  const queryBlurHandler = () => {
    setIsTouched(true);
  }

  let emptyStateContent = (
    <div className="row">
      <div className="col-sm-3"></div>
      <div className="col-sm-6">
        <h3>
          Hey there!
          <br />
          What are you looking for..?
          <br />
          Please let us know via that search bar..
        </h3>
        <img
          className="heroImg"
          src="./images/searchquerynull.svg"
          alt="Delivery boy here to deliver your order."
        />
      </div>
      <div className="col-sm-3"></div>
    </div>
  );

  return (
    <div className="row">
      <div id="info" className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for groceries.."
          aria-label="Search for veggies.."
          aria-describedby="button-addon2"
          onChange={searchQueryHandler}
          value={searchQuery}
          onBlur={queryBlurHandler}
        />
        <button
          className="btn btn-outline-success"
          type="button"
          id="button-addon2"
          onClick={searchProducts}
        >
          Search
        </button>
      </div>
      <div id="info">
        <h3 id="highlight">Results for '{searchQuery}'</h3>
        <br />
        {loading ? (
          <div id="highlight" className="content container">
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <h3>Let us check the stockroom..</h3>
            </div>
          </div>
        ) : (
          <p>Products appear here</p>
        )}
      </div>
      {isTouched && emptyStateContent}
    </div>
  );
};

export default ConsumerHomePage;
