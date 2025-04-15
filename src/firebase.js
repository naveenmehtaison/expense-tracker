// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDguHoXw6MKK72PEGbVSBL8YbZkfCkSiDc",
  authDomain: "expensetracker-27a82.firebaseapp.com",
  databaseURL: "https://expensetracker-27a82-default-rtdb.firebaseio.com",
  projectId: "expensetracker-27a82",
  storageBucket: "expensetracker-27a82.firebasestorage.app",
  messagingSenderId: "220726063157",
  appId: "1:220726063157:web:99dc8cc597290543f1c17c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { auth,  };