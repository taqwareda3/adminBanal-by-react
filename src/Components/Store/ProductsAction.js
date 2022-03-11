import { db } from "../firebase-config";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const getProducts = async (products) => {
  console.log(products);
  const productsIds = products.map((id) =>
    id.Product_Id.id.replace(/\s+/g, "")
  );

  const q = query(
    collection(db, "Products"),
    where(documentId(), "in", productsIds)
  );
  const productsDocsSnap = await getDocs(q);
  const alldata = productsDocsSnap.docs.map((doc, index) => ({
    ...doc.data(),
    details: products[index],
  }));

  return alldata;
};

function getOrderDetails(products) {
  return (dispatch) => {
    getProducts(products)
      .then((prds) => dispatch({ type: "GET_PRODUCTS", payload: prds }))
      .catch((err) => {
        console.log(err);
      });
  };
}
export default getOrderDetails;
