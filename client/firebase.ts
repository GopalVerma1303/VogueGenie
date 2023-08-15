import {getApp, getApps, initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyBycw_JXHPpWhmqQ0KQ03JVLOTYA45UnPg",
  authDomain: "voguegenie-3d756.firebaseapp.com",
  projectId: "voguegenie-3d756",
  storageBucket: "voguegenie-3d756.appspot.com",
  // messagingSenderId: "870315923070",
  // appId: "1:870315923070:web:13cfa8d34cac85119eea2f",
  // measurementId: "G-8C4GHGG1YP"
};

// Initialize Firebase
const app = getApps.length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};