// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
// import Firebase Database 
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3OL1EXXiHtgMY6qVaBXCtGKOwQ2RVTOs",
  authDomain: "unipal-c7620.firebaseapp.com",
  databaseURL: "https://unipal-c7620-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "unipal-c7620",
  storageBucket: "unipal-c7620.appspot.com",
  messagingSenderId: "715800126177",
  appId: "1:715800126177:web:a7e46053a672bde594cda0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Export the Firebase Realtime Database object
export const db = getDatabase();

export default app;