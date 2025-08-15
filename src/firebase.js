const firebaseConfig = {
    apiKey: "AIzaSyCtXKp4cyZt3ApgGykgBONmEflWKoQI-lU",
    authDomain: "vue2-score-counter.firebaseapp.com",
    projectId: "vue2-score-counter",
    storageBucket: "vue2-score-counter.firebasestorage.app",
    messagingSenderId: "583077604905",
    appId: "1:583077604905:web:b14816e47d752eb616f638"
};

import firebase from 'firebase/app';
import 'firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export { db, firebase };
