import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtlLu2FfMeIwvMJjOKL7Ukq92N5CqAuuI",
  authDomain: "todo-list-ef836.firebaseapp.com",
  projectId: "todo-list-ef836",
  storageBucket: "todo-list-ef836.firebasestorage.app",
  messagingSenderId: "138805232204",
  appId: "1:138805232204:web:9cce1949142d2a3d7c6ae9",
  measurementId: "G-351P5N213E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

