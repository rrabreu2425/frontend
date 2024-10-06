import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDmNCBaK6Q5AkhXPbYuSgO9hsM3npQ8lGA",
    authDomain: "authentication-572c3.firebaseapp.com",
    projectId: "authentication-572c3",
    storageBucket: "authentication-572c3.appspot.com",
    messagingSenderId: "391877434899",
    appId: "1:391877434899:web:9d4e9feddc059a44e5e9e6"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()

export { auth, provider, signInWithPopup, signOut, getAuth};