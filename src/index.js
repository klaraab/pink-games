import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import * as firebase from "firebase/app";
import "firebase/analytics";

var firebaseConfig = {
  apiKey: "AIzaSyAFAt0VMa-qHcCMiShYQWDBDL34IIKTp9E",
  authDomain: "pink-games-3903b.firebaseapp.com",
  databaseURL: "https://pink-games-3903b.firebaseio.com",
  projectId: "pink-games-3903b",
  storageBucket: "pink-games-3903b.appspot.com",
  messagingSenderId: "843041489754",
  appId: "1:843041489754:web:c25d499e16e48b85022963",
  measurementId: "G-DMRC00268V",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
ReactDOM.render(<App />, document.getElementById("app"));
