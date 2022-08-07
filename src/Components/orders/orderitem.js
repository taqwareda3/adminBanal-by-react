import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import "../orders/orders.css";
import { useParams } from "react-router-dom";
import './../style/style.css'

const OrderItem = (props) => {
  const [statee, setstat] = useState(props.status);
  const { id } = useParams();
  const UpdateOrderStaus = async (id, e) => {

    let updateuser = doc(db, "Orders", id);
    let res = (await getDoc(updateuser)).data();

    let m = { ...res.Product[props.id], deliveredstatus: e };
    res.Product[props.id] = m;
    console.log(res.Product);
    await updateDoc(updateuser, { Product: res.Product });
  };
  useEffect(() => {
    setstat(props.status)
  }, [])
  return (


    <tr key={props.id}>
      <td>{props.id+1}</td>
      <td>
        <img src={props.img} className="orderimg" />
      </td>

      <td> {props.name} </td>
      <td> {props.price} EGP </td>

      <td> {props.quantity}</td>
      <td>{props.category}</td>
      <td>{statee}</td>
      <td>
        <div>
          <select className="btn btn-outline-success"
            value={statee}
            onChange={(e) => {
              setstat(e.target.value);
              UpdateOrderStaus(id, e.target.value);
            }}
          >
            <option>pending</option>
            <option>shipping</option>
            <option>delivered</option>
            <option>canceled</option>
          </select>
        </div>
      </td>
    </tr>


  );
};
export default OrderItem;
