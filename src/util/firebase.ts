// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_apiKey,
  authDomain: import.meta.env.VITE_APP_authDomain,
  projectId: import.meta.env.VITE_APP_projectId,
  storageBucket: import.meta.env.VITE_APP_storageBucket,
  messagingSenderId: import.meta.env.VITE_APP_messagingSenderId,
  appId: import.meta.env.VITE_APP_appId,
  measurementId: import.meta.env.VITE_APP_measurementId,
};

// Initialize Firebase
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}
export const firestore = getFirestore();
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();

