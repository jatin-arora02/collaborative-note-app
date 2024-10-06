// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import store from "./store"; // Import your Redux store
import { login, logout } from "./store/authSlice";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu-_UUrd-PFVZzPehIYiIazo4qX7ygIhY",
  authDomain: "collaborative-notes-3008d.firebaseapp.com",
  projectId: "collaborative-notes-3008d",
  storageBucket: "collaborative-notes-3008d.appspot.com",
  messagingSenderId: "210402264352",
  appId: "1:210402264352:web:5f42368cfd8a5fd5f10345",
  measurementId: "G-HL1XG1LEX0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Set up an observer on the Auth object to listen for user state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(login(user)); // Dispatch login action with user data
  } else {
    store.dispatch(logout()); // Dispatch logout action if user is not authenticated
  }
});

export { auth, db };
