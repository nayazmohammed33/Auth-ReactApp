// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBm7sa7FWN8Hir1RIN4CPQK-QTaQOh7-lM",
  authDomain: "auth-project-1b2cf.firebaseapp.com",
  projectId: "auth-project-1b2cf",
  storageBucket: "auth-project-1b2cf.firebasestorage.app",
  messagingSenderId: "448534831150",
  appId: "1:448534831150:web:9baaaec8c335ce8be97fbf"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
