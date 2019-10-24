import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/analytics';
import 'firebase/auth';

// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyC6PsS1jNApokSdmFxFVfPRJGADT1-2T1I",
    authDomain: "reactapp-54dd5.firebaseapp.com",
    databaseURL: "https://reactapp-54dd5.firebaseio.com",
    projectId: "reactapp-54dd5",
    storageBucket: "reactapp-54dd5.appspot.com",
    messagingSenderId: "925496935502",
    appId: "1:925496935502:web:7136ebfe4f2e3084362f1f",
    measurementId: "G-STB4YTE6FS"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase;