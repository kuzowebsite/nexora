// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCLE5YaaA19xEQjhxnuYRDY16kmz5CpUM",
  authDomain: "nexora-79493.firebaseapp.com",
  projectId: "nexora-79493",
  storageBucket: "nexora-79493.firebasestorage.app",
  messagingSenderId: "592841812290",
  appId: "1:592841812290:web:909d532853040ce6a9c0db",
  measurementId: "G-RWCLYDZMPW",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
