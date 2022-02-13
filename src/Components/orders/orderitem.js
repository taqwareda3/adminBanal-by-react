import React from "react";
import "../orders/orders.css";

const OrderItem = (props) => {
  return (
    <>
      {console.log(props)}
      <tr>
        <td>{props.id}</td>
        <td>
          <img src={props.img} class="orderimg" />
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
