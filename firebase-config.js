import * as firebase from "firebase/app";

// Optionally import the services that you want to use
import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDamwF0qcJSR8f0u50XCDkv6slwxA-e1E",
  authDomain: "ecommerce-app-dni.firebaseapp.com",
  databaseURL: "https://ecommerce-app-dni.firebaseio.com",
  projectId: "ecommerce-app-dni",
  storageBucket: "ecommerce-app-dni.appspot.com",
  messagingSenderId: "131180263398",
  appId: "1:131180263398:web:590ae8736e412b193d8827",
  measurementId: "G-6FE00Z5220",
};
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const db = app.firestore();
const auth = app.auth();
export { db, auth };
