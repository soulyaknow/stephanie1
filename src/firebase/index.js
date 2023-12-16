import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxQJAp1K97jrRIFD5Tp2PJaW9MhVXVbIg",
  authDomain: "todolist-eb113.firebaseapp.com",
  projectId: "todolist-eb113",
  storageBucket: "todolist-eb113.appspot.com",
  messagingSenderId: "67977328100",
  appId: "1:67977328100:web:51cb9802bf3c54995f43f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);