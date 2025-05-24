import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxhgbqrbmXut_aapfKndeyDFO_9pE3aNo",
  authDomain: "apporcai.firebaseapp.com",
  projectId: "apporcai",
  storageBucket: "apporcai.appspot.com",
  messagingSenderId: "935483028435",
  appId: "1:935483028435:web:5cebca466114844fe17526",
  measurementId: "G-9VB4WXYWF4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };