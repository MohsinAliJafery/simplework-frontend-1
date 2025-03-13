import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration (Replace with your actual config)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "simplework-7aac0.firebaseapp.com",
  projectId: "simplework-7aac0",
  storageBucket: "simplework-7aac0.firebasestorage.app",
  messagingSenderId: "350884078309",
  appId: "1:350884078309:web:5fd9690ce16828795c6a0c",
  measurementId: "G-JHFDBQBK0Q"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
