// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-8260f.firebaseapp.com",
  projectId: "realestate-8260f",
  storageBucket: "realestate-8260f.appspot.com",
  messagingSenderId: "855108188199",
  appId: "1:855108188199:web:683a793501cc87ee5e7602",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
