import React from "react";
import "../orders/orders.css";

const OrderItem = (props) => {
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
      </tr>
    </>
  );
};
export default OrderItem;
