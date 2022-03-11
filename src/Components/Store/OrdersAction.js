import { db } from "../firebase-config";
import {
  collection,
  documentId,
  getDocs,
  getDoc,
  query,
  where,
  limit,
} from "firebase/firestore";

import "firebase/database";

async function e(buyerId) {
  const q = query(collection(db, "users"), where(documentId(), "==", buyerId));
  const buyerDocsSnap = await getDoc(q);
  const d = buyerDocsSnap.data();
  console.log(d);
  
  //const allbuyers = buyerDocsSnap.docs.map((doc) => doc.data());
  return d;
}

const getData = async () => {
  const OrdersCollectionRef = collection(db, "Orders");

  //const OrdersCollectionRef = collection(db, "Orders");
  const Orders = await getDocs(OrdersCollectionRef);
  const alldata = Orders.docs.map((doc) => ({
    ...doc.data(),
    id:doc.id
  }));

 
  //const buyerId = alldata.map((order) => order.buyer.id.replace(/\s+/g, ""));

  //const q = query(collection(db, "users"),where(documentId(), "in", buyerId))
 
 
 //const allbuyers = buyerDocsSnap.docs.map((doc) => doc.data());


  //   const buyerDocsSnap = await getDocs(q);
  //  const allbuyers = buyerDocsSnap.docs.map((doc) => doc.data());

  //   const updatalldata = alldata.map((order, index) => ({
  //     ...order,
  //      firstname: allbuyers[index].firstname,
  //     email: allbuyers[index].email,
  //  }));
  //   console.log(allbuyers);
  return alldata;
};
function getOrders(e) {
  return (dispatch) => {
    getData(e)
      .then((orders) => dispatch({ type: "GET_ORDERS", payload: orders }))

      .catch((err) => {
        console.log(err);
      });
  };
}
export default getOrders;
