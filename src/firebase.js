/*eslint eqeqeq:0*/
// libraries
// import firebase from 'firebase/app'
import firebase from '@firebase/app'
import 'firebase/firebase-auth'
import 'firebase/storage'

// set firebase config
const firebaseConfig = ({
    apiKey: "AIzaSyB19S8j2n-M-hFbYiPgL6X2SLo8K_jDlZo",
    authDomain: "semo-o1805.firebaseapp.com",
    databaseURL: "https://semo-o1805.firebaseio.com",
    projectId: "semo-o1805",
    storageBucket: "semo-o1805.appspot.com",
    messagingSenderId: "1083903204858",
    appId: "1:1083903204858:web:babd3c6c7a677eee415843"
});

const fb = firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()

export {fb, storage}