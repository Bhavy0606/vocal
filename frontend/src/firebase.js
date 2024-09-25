// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAs3KepvoOyF80IURBhrBplo5H_bW6wNZ4",
  authDomain: "vocal10.firebaseapp.com",
  projectId: "vocal10",
  storageBucket: "vocal10.appspot.com",
  messagingSenderId: "532516926901",
  appId: "1:532516926901:web:d684adbb5688bc087dd5fc",
  measurementId: "G-RJCWH6C40X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth();
const provider = new GoogleAuthProvider();
export { auth, provider };

export default db;
