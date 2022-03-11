import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyABMSgpsBPB7_X2Yb6MP7BvyJ6Nsx29LCY",
    authDomain: "jumia-1ff31.firebaseapp.com",
    projectId: "jumia-1ff31",
    storageBucket: "jumia-1ff31.appspot.com",
    messagingSenderId: "339082607573",
    appId: "1:339082607573:web:817bef3ff2a645c738db5c",
    measurementId: "G-812PBEVC9Y"
  };
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCxLz8NUY5Mks2XIiK7Eol0EewZxsZdHAA",
//   authDomain: "test-d85bd.firebaseapp.com",
//   projectId: "test-d85bd",
//   storageBucket: "test-d85bd.appspot.com",
//   messagingSenderId: "619882224571",
//   appId: "1:619882224571:web:a5dd8a7f6c52f33ca5429e",
//   measurementId: "G-4RYNE3CHB0"
// };
const app =initializeApp(firebaseConfig);

  // const app = initializeApp(firebaseConfig);
 export const db =getFirestore(app);