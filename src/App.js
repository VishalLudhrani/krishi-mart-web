import React from 'react';
import './App.css';
import Login from './Login';

class App extends React.Component {
  render() {
    return(
      <div className="App">
        <Login firestore={this.props.firestore} />
      </div>
    );
  }
}

export default App;
