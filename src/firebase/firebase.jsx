
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDcHQAq4G35QflxQhjsVb1LxdGp9zkIJgU",
  authDomain: "talkify-71533.firebaseapp.com",
  projectId: "talkify-71533",
  storageBucket: "talkify-71533.firebasestorage.app",
  messagingSenderId: "78200460018",
  appId: "1:78200460018:web:719b172ed07199dfb3f66b",
  measurementId: "G-6PFL3YS82S"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const analytics = getAnalytics(app);

export {app , auth, analytics}