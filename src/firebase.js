
// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQtmtktGNHegBML2Sn7Gt0R1bS3ph0guE",
  authDomain: "myreactapp-afd9d.firebaseapp.com",
  projectId: "myreactapp-afd9d",
  storageBucket: "myreactapp-afd9d.appspot.com",
  messagingSenderId: "518913379081",
  appId: "1:518913379081:web:8d89e686005e74cd4ea1d8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
