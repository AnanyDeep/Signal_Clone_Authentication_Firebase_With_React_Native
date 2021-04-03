// // import * as firebase from '@react-native-firebase/appfirebase';
// import firebase from '@firebase/app'
// import 'firebase/firestore';
// // import 'firebase/auth'
// import 'firebase/auth';

// const firebaseConfig = {
//     apiKey: "AIzaSyCV-VAs0LMmllMxIhdjUQME2GzXVCTHAVY",
//     authDomain: "signal-clone-194c8.firebaseapp.com",
//     projectId: "signal-clone-194c8",
//     storageBucket: "signal-clone-194c8.appspot.com",
//     messagingSenderId: "1095927114710",
//     appId: "1:1095927114710:web:124bac6d1ea5e9befe1277"
//   };
//   // Initialize Firebase

//   let app;

//   if (firebase.app.length === 0 ) {
//       app = firebase.initializeApp(firebaseConfig);
//   } else {
//       app = firebase.app();
//   }

//   const db = app.firestore();
//   const auth = firebase.auth();

//   export {db , auth};

// // app = firebase.initializeApp(firebaseConfig);

// import firebase from 'react-native-firebase';
// firebase.firestore().collection("products")

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCV-VAs0LMmllMxIhdjUQME2GzXVCTHAVY",
  authDomain: "signal-clone-194c8.firebaseapp.com",
  projectId: "signal-clone-194c8",
  storageBucket: "signal-clone-194c8.appspot.com",
  messagingSenderId: "1095927114710",
  appId: "1:1095927114710:web:124bac6d1ea5e9befe1277",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
