import { db } from "../firebase-config";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import "firebase/database";
const BestProducts = async () => {
  const prodctsRef = collection(db, "Products");
  const q = query(prodctsRef, where("Rank", ">=", 10));
  const productsDocsSnap = await getDocs(q);
  const alldata = productsDocsSnap.docs.map((doc, index) => ({
    ...doc.data(),
  }));
 return alldata
};

function getBestProducts() {
    return (dispatch) => {
        BestProducts()
        .then((prds) => dispatch({ type: "GET_BEST_PRODUCTS", payload: prds }))
        .catch((err) => {
          console.log(err);
        });
    };
  }
  export default getBestProducts;