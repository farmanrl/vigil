import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyC3qoBh67KSe90LDbs_ApvcK1qVHAKDFAc',
  authDomain: 'vibe-f5b8a.firebaseapp.com',
  databaseURL: 'https://vibe-f5b8a.firebaseio.com',
  storageBucket: 'vibe-f5b8a.appspot.com',
  messagingSenderId: '676511174949'
};

export const firebaseApp = firebase.initializeApp(config);
export const auth = firebaseApp.auth();
export const database = firebaseApp.database();
