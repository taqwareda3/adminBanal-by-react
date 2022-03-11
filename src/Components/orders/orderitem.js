import React, { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import "../orders/orders.css";
import { useParams } from "react-router-dom";

const OrderItem = (props) => {
  const [statee, setstat] = useState(props.status);
  const { id } = useParams();
  const areUSureToPane = async (id,e) => {
    console.log(e);
    let updateuser = doc(db, "Orders", id);
    let res = (await getDoc(updateuser)).data();

    let m = { ...res.Product[0], delviredstatus: e };
    res.Product[0] = m;
    console.log(res.Product);
    await updateDoc(updateuser, { Product: res.Product });
  };
  return (
    <>
      <tr key={props.id}>
        <td>{props.id}</td>
        <td>
          <img src={props.img} className="orderimg" />
        </td>

        <td> {props.name} </td>
        <td> {props.price} EGP </td>

        <td> {props.quantity}</td>
        <td>{props.category}</td>
        
        <td>
          <div>
            <select className="select"
            value={statee}
              onChange={(e) => {
                setstat(e.target.value);
                areUSureToPane(id,e.target.value);
              }}
            >
              <option>pending</option>
              <option>shipping</option>
              <option>deliverd</option>
              <option>canceled</option>
            </select>
          </div>
        </td>
      </tr>
    </>
  );
};
export default OrderItem;
