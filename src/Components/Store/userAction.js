import { db } from "../firebase-config";

import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import "firebase/database";

const getData = async () => {
  const Users = collection(db, "users");
  const seller = await getDocs(Users);
  const UsersDocs = seller.docs
    .map((index) => ({ ...index.data(), id: index.id }))
  console.log(UsersDocs);
  return UsersDocs;
};



export function getUsers() {
  return (dispatch) => {
    getData()
      .then((user) => dispatch({ type: "GET_SELLERS", payload: user }))

      .catch((err) => {
        console.log(err);
      });
  };
}

 
