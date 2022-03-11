import { db } from "../firebase-config";

import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import "firebase/database";
const getDeActiveData = async () => {
     const Users = collection(db, "Seller");
     const seller = await getDocs(Users);
     const UsersDocs = seller.docs
       .map((index) => ({ ...index.data(), id: index.id }))
       .filter((item) => item.IsActive==false && !item.IsNew);
    
     console.log(UsersDocs);
     return UsersDocs;
   };
   export function deActivegetSellers() {
     return (dispatch) => {
       getDeActiveData()
         .then((seller) => dispatch({ type: "GET_DEACTIVE_SELLERS", payload: seller }))
   
         .catch((err) => {
           console.log(err);
         });
     };
   }