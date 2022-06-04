import { useSelector } from "react-redux";
import withAuth from "guards/with-auth";
import { useHistory } from "react-router-dom";

const UserProfile = () => {
  const user = useSelector((state) => state.user.data);
  const history = useHistory();

  const editProfileClickHandler = () => {
    history.push("/profile/edit");
  }

  if (user.name.length === 0) {
    return (
      <div className="text-center">
        <h2>Loading, please wait...</h2>
        <div className="spinner-border mt-4" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div id="info">
      <div className="row mt-4">
        <h1 id="highlight" className="mb-4">My Profile</h1>
        <div className="col-sm-6 col-md-4 mt-4">
          <img
            src={user.photoURL}
            style={{ borderRadius: "50%", width: "60%", height: "auto" }}
            alt="User profile"
          />
        </div>
        <div className="col-sm-6 col-md-8 mt-4" style={{ padding: "10px" }}>
          <p>{user.name}</p>
          <p>
            <i className="fas fa-phone-alt"></i> {user.phone ? user.phone : "Not updated yet"}
          </p>
          <p>
            <i className="fas fa-envelope"></i> {user.email ? user.email : "Not updated yet"}
          </p>
          <p>
            <i className="fas fa-map-pin"></i> {user.address ? user.address : "Not updated yet"}
          </p>
          <button
            className="customBtn"
            style={{ borderRadius: "10px" }}
            onClick={editProfileClickHandler}
          >
            <i className="fas fa-pen"></i> Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(UserProfile);
