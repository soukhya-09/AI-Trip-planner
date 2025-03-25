
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from  "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyCDtoCf0oY8DhNU2LOaC57wvC6vjGAVev8",
  authDomain: "trip-planner-614bc.firebaseapp.com",
  projectId: "trip-planner-614bc",
  storageBucket: "trip-planner-614bc.firebasestorage.app",
  messagingSenderId: "813745065845",
  appId: "1:813745065845:web:e92fe762ae02f3e8a10d3c",
  measurementId: "G-92V8GLRFMN"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
