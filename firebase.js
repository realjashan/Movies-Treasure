import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAxVfruaF2el3BHQY78xNjorLgHWHoXkUM",
    authDomain: "netflixnative-9dc69.firebaseapp.com",
    projectId: "netflixnative-9dc69",
    storageBucket: "netflixnative-9dc69.appspot.com",
    messagingSenderId: "510848476122",
    appId: "1:510848476122:web:255a82d92f4179984d56e3"
  };

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };