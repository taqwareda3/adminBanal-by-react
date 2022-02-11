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
  const OrdersCollectionRef = collection(db, "Orders");
  const Orders = await getDocs(OrdersCollectionRef);
  const alldata = Orders.docs.map((doc) => ({ ...doc.data() }));
  const buyerId = alldata.map((order) => order.buyer.id.replace(/\s+/g, ""));

  const q = query(collection(db, "users"), where(documentId(), "in", buyerId));
  const buyerDocsSnap = await getDocs(q);
  const allbuyers = buyerDocsSnap.docs.map((doc) => doc.data());
 
  const updatalldata = alldata.map((order, index) => ({
    ...order,
    firstname: allbuyers[index].firstname,
    email: allbuyers[index].email,
  }));
  console.log(updatalldata);
  return updatalldata;
};
function getOrders() {
  return (dispatch) => {
    getData()
      .then((orders) => dispatch({ type: "GET_ORDERS", payload: orders }))

      .catch((err) => {
        console.log(err);
      });
  };
}
export default getOrders;
