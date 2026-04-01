// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHpXSubmVaTlpIB9TLYpVK35R-KqW4f_g",
  authDomain: "opencosmo-c41fb.firebaseapp.com",
  projectId: "opencosmo-c41fb",
  storageBucket: "opencosmo-c41fb.firebasestorage.app",
  messagingSenderId: "371325979109",
  appId: "1:371325979109:web:07325515bfb828c279070c",
  measurementId: "G-P9K4T9MT1W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
