import { db } from "../firebase-config";
import {
  collection,
  doc,
  documentId,
  getDoc,
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
const getProds = async (id) => {
  const q = query(collection(db, "Orders"), where(documentId(), "==", id));
  const result = await getDocs(q);

  const data = result.docs.map((e) => ({ ...e.data() }));

  let refs = data[0].Product.map((e) => {
    return e.Product_Id.id;
  });
  const q2 = query(collection(db, "Products"), where(documentId(), "in", refs));
  const result2 = await getDocs(q2);
  const data2 = result2.docs.map((e) => ({ ...e.data() }));

  const alldata = data[0].Product.map((e, index) => ({
    ...e,
    ...data2[index],
  }));
  console.log(alldata);
  return alldata;
};

function getOrderDetails(products) {
  return (dispatch) => {
    getProds(products)
      .then((prds) => dispatch({ type: "GET_PRODUCTS", payload: prds }))
      .catch((err) => {
        console.log(err);
      });
  };
}
export default getOrderDetails;
