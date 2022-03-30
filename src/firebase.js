import firebase from 'firebase/compat/app';
import firestore from 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDhHisXr5MfKmsio0J3HZk1B_nLTY6XPo8',
  authDomain: 'users-8c6d0.firebaseapp.com',
  projectId: 'users-8c6d0',
  storageBucket: 'users-8c6d0.appspot.com',
  messagingSenderId: '984386796625',
  appId: '1:984386796625:web:9c3d683f7c99c311874c70',
};

const FirebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
