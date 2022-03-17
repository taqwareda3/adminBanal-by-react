import React, { useState ,useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import "../orders/orders.css";
import { useParams } from "react-router-dom";
import'./../style/style.css'

const OrderItem = (props) => {
  const [statee, setstat] = useState(props.status);
  const { id } = useParams();
  const areUSureToPane = async (id, e) => {
    console.log(e);
    let updateuser = doc(db, "Orders", id);
    let res = (await getDoc(updateuser)).data();

    let m = { ...res.Product[0], deliveredstatus: e };
    res.Product[0] = m;
    console.log(res.Product);
    await updateDoc(updateuser, { Product: res.Product });
  };
useEffect(()=>{
setstat(props.status)
},[])
  return (
    <>
      <div className=" row">
     
          <table className="rwd-table text-dark ">
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Name</th>
                <th>Pice</th>
                <th>quantity</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr key={props.id}>
                <td>{props.id}</td>
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
                        areUSureToPane(id, e.target.value);
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
            </tbody>
          </table>
   
      </div>

    </>
  );
};
export default OrderItem;
