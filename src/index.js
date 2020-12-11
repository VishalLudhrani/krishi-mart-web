import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import firebase from 'firebase/app';
import App from './App';

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
