import { db } from "../firebase-config";

import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import "firebase/database";
const getSellerRequest = async () => {
     const Users = collection(db, "Seller");
     const seller = await getDocs(Users);
     const UsersDocs = seller.docs
       .map((index) => ({ ...index.data(), id: index.id }))
       .filter((item) => ( item.IsNew));
    
     console.log(UsersDocs);
     return UsersDocs;
   };
   export function getSellersRequest() {
     return (dispatch) => {
          getSellerRequest()
         .then((seller) => dispatch({ type: "GET_SELLERS-REQUEST", payload: seller }))
   
         .catch((err) => {
           console.log(err);
         });
     };
   }