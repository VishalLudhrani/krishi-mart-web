import React from 'react';

class EditUser extends React.Component {
  componentDidMount() {
    document.title = "Update Profile | Krishi Mart";
  }

  render() {
    return(
      <div className="content">
        <h1>Edit Profile</h1>
      </div>
    );
  }
}

export default EditUser;