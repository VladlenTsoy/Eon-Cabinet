import * as firebase from 'firebase/app';
import 'firebase/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyC3XSq_7Q4IZa6BB6I2qIfYyIwpLNU3OSw",
    authDomain: "eon-cabinet.firebaseapp.com",
    databaseURL: "https://eon-cabinet.firebaseio.com",
    projectId: "eon-cabinet",
    storageBucket: "eon-cabinet.appspot.com",
    messagingSenderId: "1035895386647",
    appId: "1:1035895386647:web:00a1abdaadf2f20b58a252",
    measurementId: "G-QSFG92FRGJ"
});

const firestoreSetting = firebase.firestore()

export const firestore = firestoreSetting;