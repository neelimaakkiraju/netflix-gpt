// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsyuWSRSrRVYqOCf0bUwxYGwEpU8oz27E",
  authDomain: "netflixgpt-a3095.firebaseapp.com",
  projectId: "netflixgpt-a3095",
  storageBucket: "netflixgpt-a3095.firebasestorage.app",
  messagingSenderId: "650186122718",
  appId: "1:650186122718:web:2bd21ea3439a1b0d6b694f",
  measurementId: "G-PYCXHFCFPT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

