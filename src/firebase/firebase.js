
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1g7I24cN8yYzCZy4-aUPXxlYEt7FVjLc",
  authDomain: "hr-recipyai.firebaseapp.com",
  projectId: "hr-recipyai",
  storageBucket: "hr-recipyai.firebasestorage.app",
  messagingSenderId: "481848246418",
  appId: "1:481848246418:web:17a0a24dd221ffe35ae64b"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const analytics = getAnalytics(app);

export {app , auth, analytics}