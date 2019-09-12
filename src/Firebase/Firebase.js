import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_SECRET,
  authDomain: "rbhcom-39b82.firebaseapp.com",
  databaseURL: "https://rbhcom-39b82.firebaseio.com",
  projectId: "rbhcom-39b82",
  storageBucket: "rbhcom-39b82.appspot.com",
  messagingSenderId: "342678852923",
  appId: "1:342678852923:web:5b03d380780e0049"
};

firebase.initializeApp(config);
firebase.firestore();


export default firebase;
