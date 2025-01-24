
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "",
    authDomain: "madrocket-f3db4.firebaseapp.com",
    projectId: "madrocket-f3db4",
    storageBucket: "madrocket-f3db4.firebasestorage.app",
    messagingSenderId: "1052491197962",
    appId: "1:1052491197962:web:5bec70d1d408090717b9f3",
    measurementId: "G-C1QXN063VM"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 
export const db = getFirestore(app); 
