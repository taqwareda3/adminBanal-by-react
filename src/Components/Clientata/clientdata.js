import { useParams } from "react-router-dom";
import { db } from "../firebase-config";
import { Link } from "react-router-dom";

import "./client.css";
import {
  collection,
  documentId,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
const ClientData = () => {
  const { id } = useParams();
  const [client, setclient] = useState({});
  const [Orders, setOrders] = useState([]);
  const getClient = async () => {
    const q = query(collection(db, "users"), where(documentId(), "==", id));

    const client = await getDocs(q);
    const alldata = client.docs.map((e) => {
      return e.data();
    });

    return alldata;
  };
  const getOrders = async () => {
    const q = query(
      collection(db, "Orders"),
      where("buyer", "==", doc(db, "users/" + id))
    );

    const client = await getDocs(q);
    const alldata = client.docs.map((e) => {
      return e.data();
    });

    return alldata;
  };
  useEffect(() => {
    getClient().then((e) => setclient(...e));
    getOrders().then((e) => setOrders(e));
  }, []);

  return (
    <div className="mt-5">
      <div className="client success rounded shadow   text-white">
        <header className="head fs-5 fw-bold py-2">
          {client.firstname} {client.lastname}
        </header>
        <div className="m-3 text-white">
          <h3 className=" py-2">
            {" "}
            <span className=" fw-bold ">Phone: </span>
            {client.phone}
          </h3>
          <h3 className=" py-2">
            {" "}
            <span className="t fw-bold">Email: </span>
            {client.email}
          </h3>
          <h3 className=" py-2">
            {" "}
            <span className="fw-bold">#Ordes: </span>
            {Orders.length}
          </h3>
        </div>
      </div>
      <table className="rwd-table m-0">
        <thead>
          <tr>
            <th>#</th>
            <th>Total</th>

            <th>Order date</th>
            <th></th>
          </tr>
        </thead>
        {Orders.map((order, index) => {
          return (
            <tbody key={index}>
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{order.Total}</td>
                

                <td>{order.date}</td>
                <td>
                  {/* <Link to="/orderDetails">
                    <button
                      onClick={() => senddata(order.Product)}
                      className="btn text-white fw-bold orange"
                    >
                      show details
                    </button>
                  </Link> */}
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};
export default ClientData;
