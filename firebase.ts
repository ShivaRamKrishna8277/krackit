// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2CTNMvgr2awHtS5xUPPfcNUKJ6Jq4Dx8",
  authDomain: "krackit-83d01.firebaseapp.com",
  projectId: "krackit-83d01",
  storageBucket: "krackit-83d01.appspot.com",
  messagingSenderId: "58930982149",
  appId: "1:58930982149:web:51e5544aa5fc67462e1b6c",
  databaseURL:
    "https://krackit-83d01-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export `auth`
const auth = getAuth(app);
export default auth;
// Export database
export const db = getDatabase(app);
