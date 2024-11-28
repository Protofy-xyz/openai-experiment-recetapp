// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };