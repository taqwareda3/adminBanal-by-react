import { db } from "../firebase-config";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

import "firebase/database";
const getData2 = async (index) => {
  let id = index?.replace(/\s+/g, "");
  const docRef = doc(db, id);
  const user = await getDoc(docRef);
  return user.data();
};
const getData = async () => {
  const OrdersCollectionRef = collection(db, "Orders");
  const Orders = await getDocs(OrdersCollectionRef);
  const alldata = Orders.docs.map((doc) => ({ ...doc.data() }));

  return alldata;
};
function getProducts() {
  return (dispatch) => {
    getData()
      .then((orders) => dispatch({ type: "GET_PRODUCTS", payload: orders }))

      .catch((err) => {
        console.log(err);
      });
  };
}
export default getProducts;
