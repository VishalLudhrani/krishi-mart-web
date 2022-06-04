import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/cart-slice";
import { userActions } from "../../../store/user-slice";

const Navbar = () => {
  const totalCartItems = useSelector(state => state.cart.data.totalItems);
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const userData = useSelector(state => state.user.data);
  const dispatch = useDispatch();
  
  const userLogout = () => {
    firebase.auth().signOut();
    dispatch(userActions.resetUser());
    dispatch(cartActions.resetCart());
  };

  return (
    <nav id="highlight" className="row">
      <div className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <button
            style={{ border: "0px" }}
            className="navbar-toggler customBtn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars" style={{ fontSize: "1.5rem" }}></i>
          </button>
          <Link to="/home" className="navbar-brand cursor-pointer">
            <img
              src={process.env.PUBLIC_URL + "/images/logo.png"}
              alt="logo"
              width="64"
              height="64"
              style={{ marginLeft: "24px" }}
            />
          </Link>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <div id="google_translate_element">
                  <span className="nav-link cursor-pointer">
                    Please select a language
                  </span>
                </div>
              </li>
              <li className="nav-item">
                <div
                  className={isLoggedIn ? "display-block dropdown" : "display-none"}
                >
                  <span
                    className="nav-link dropdown-toggle cursor-pointer"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userData.photoURL.length > 0 ? (
                      <img
                        src={userData.photoURL}
                        width="32"
                        height="32"
                        style={{ borderRadius: "50%" }}
                        alt="User Profile"
                      />
                    ) : (
                      <i className="fa fa-user"></i>
                    )}
                    <span> {userData.name.length ? userData.name : "User"}</span>
                  </span>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <span className="dropdown-item cursor-pointer">
                        <Link
                          to="/profile/me"
                          style={{ textDecoration: "none", color: "#1F2421" }}
                        >
                          My Profile
                        </Link>
                      </span>
                    </li>
                    <li>
                      <span
                        className="dropdown-item cursor-pointer"
                        onClick={userLogout}
                      >
                        Logout
                      </span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          {isLoggedIn && (
            <span
              style={{
                fontSize: "1.5rem",
                color: "#49A078",
                margin: "auto 20px",
              }}
              title="My Cart"
              className="position-relative"
            >
              <Link
                style={{ color: "#49A078", textDecoration: "none" }}
                to="/cart"
              >
                {totalCartItems > 0 && (
                  <span style={{ color: 'white', fontSize: '0.75rem' }} className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    <span>{totalCartItems}</span>
                  </span>
                )}
                <i className="fas fa-shopping-cart cursor-pointer"></i>
              </Link>
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
