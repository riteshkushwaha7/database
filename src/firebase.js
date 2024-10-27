// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6Qh0ntWa5MPh4fFaQeltgQayNITq7KDY",
  authDomain: "codeadept2024.firebaseapp.com",
  // databaseURL: "https://codeadept2024-default-rtdb.firebaseio.com",
  projectId: "codeadept2024",
  storageBucket: "codeadept2024.appspot.com",
  messagingSenderId: "265211610412",
  appId: "1:265211610412:web:7d372a5c0070895a1b9889",
  // measurementId: "G-HGRDQ3Y19L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
// export const auth = getAuth();
// export default app;


// *********************************************************************************************

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth"; // Import Auth
// import { getFirestore } from "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD6Qh0ntWa5MPh4fFaQeltgQayNITq7KDY",
//   authDomain: "codeadept2024.firebaseapp.com",
//   projectId: "codeadept2024",
//   storageBucket: "codeadept2024.appspot.com",
//   messagingSenderId: "265211610412",
//   appId: "1:265211610412:web:7d372a5c0070895a1b9889",
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const db = getFirestore();
// export const auth = getAuth(); // Initialize Auth

// // Export the app if you need it elsewhere
// export default app;
