// import firebase from "firebase/app";
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';


var config = {
  apiKey: "AIzaSyCnbfLiyCnx1a_fPSsUJT19XccLM3soPoc",
  authDomain: "datetodate-f1c16.firebaseapp.com",
  databaseURL: "https://datetodate-f1c16.firebaseio.com",
  projectId: "datetodate-f1c16",
  storageBucket: "datetodate-f1c16.appspot.com",
  messagingSenderId: "177535566563"
};
firebase.initializeApp(config);


const db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
db.settings(settings);

export { db, firebase }