// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "tubeguruji--2025.firebaseapp.com",
    projectId: "tubeguruji--2025",
    storageBucket: "tubeguruji--2025.firebasestorage.app",
    messagingSenderId: "167029450389",
    appId: "1:167029450389:web:e569b7dd20f9fd44979d9c",
    measurementId: "G-BC9XG51FD9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, 'ai-fusion-lab')
