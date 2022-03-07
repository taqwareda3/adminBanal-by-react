import { db } from "../firebase-config";

import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import "firebase/database";

const getProductsColl = async () => {
  const Products = collection(db, "Products");
  const product = await getDocs(Products);
  const ProductsDocs = product.docs
    .map((index) => ({ ...index.data(), id: index.id }))
    .filter((item) => (item.isAccepted==false));
 
  console.log(ProductsDocs);
  return ProductsDocs;
};


export function getProducts() {
  return (dispatch) => {
     getProductsColl()
      .then((product) => dispatch({ type: "GET_PRODUCT", payload: product }))

      .catch((err) => {
        console.log(err);
      });
  };
}
