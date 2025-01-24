// Import the necessary Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration (replace with your actual credentials from Firebase console)
const firebaseConfig = {
    apiKey: "AIzaSyAIsSazCOOM8QtK7f8OLgjw423hbHiJnhc",
    authDomain: "madrocket-f3db4.firebaseapp.com",
    projectId: "madrocket-f3db4",
    storageBucket: "madrocket-f3db4.firebasestorage.app",
    messagingSenderId: "1052491197962",
    appId: "1:1052491197962:web:5bec70d1d408090717b9f3",
    measurementId: "G-C1QXN063VM"
  };

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
export const auth = getAuth(app); // This exports 'auth'
export const db = getFirestore(app); // This exports 'db'
