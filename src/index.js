import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/app';
// import reportWebVitals from './reportWebVitals';

const firebaseConfig = {
  apiKey: "AIzaSyD3MGgUJSNu2iK8N15mSWR7Z5m5PR8ni2Q",
  authDomain: "krishi-mart.firebaseapp.com",
  databaseURL: "https://krishi-mart.firebaseio.com",
  projectId: "krishi-mart",
  storageBucket: "krishi-mart.appspot.com",
  messagingSenderId: "722368381376",
  appId: "1:722368381376:web:ef80038e911390aa520825",
  measurementId: "G-Q4W6LKPREC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let root = document.getElementById('root');
ReactDOM.render(<App />,root);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
