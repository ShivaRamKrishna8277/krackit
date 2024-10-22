// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqzZ8JI-TmxSlscthR45XIWLtSXaSScvs",
  authDomain: "krackit-7d740.firebaseapp.com",
  projectId: "krackit-7d740",
  storageBucket: "krackit-7d740.appspot.com",
  messagingSenderId: "771247117757",
  appId: "1:771247117757:web:0617cf2c3b61edefd2eed4",
  databaseURL:
    "https://krackit-7d740-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export `auth`
const auth = getAuth(app);
export default auth;
// Export database
export const db = getDatabase(app);
