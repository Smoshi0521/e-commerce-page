// Import the functions you need from the SDKs you need
import { getApps, getApp,initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOwtRb2ySj88CVgDgtcWaCs8BxejgQypo",
  authDomain: "e-commerce-page-110a0.firebaseapp.com",
  projectId: "e-commerce-page-110a0",
  storageBucket: "e-commerce-page-110a0.appspot.com",
  messagingSenderId: "449297373585",
  appId: "1:449297373585:web:6d7088ada718d2bf5ae230",
  measurementId: "G-6X3V45G4WP"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app);

export {db}