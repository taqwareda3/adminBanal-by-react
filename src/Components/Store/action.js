import { db } from "./../firebase-config";
import { collection, getDoc, doc } from "firebase/firestore";

function getProducts(data) {
  return {
    type: "GET_PRODUCT",
    payload: data,
  };
}
export default getProducts;
