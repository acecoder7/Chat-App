import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCyvU0GK1UklaKkHcON8auGxuKvwYLskzY",
  authDomain: "chat-app-62c49.firebaseapp.com",
  projectId: "chat-app-62c49",
  storageBucket: "chat-app-62c49.appspot.com",
  messagingSenderId: "127407628568",
  appId: "1:127407628568:web:277663e70ffa12512f7e6d",
  measurementId: "G-4VG29DLDEY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage();
export const db = getFirestore();




