import React from "react";
import "../orders/orders.css";

const OrderItem = (props) => {
  return (
    <>
    {console.log(props)}
      <tr className="py-1">
        <td className="fs-5 pt-4  text-center">{props.id}</td>
        <td>
          <img src={props.img} class="orderimg" />
        </td>

        <td className="fs-5 pt-4  fw-bold text-center" > {props.name} </td>
        <td className="fs-5 pt-4  fw-bold text-center"> {props.quantity}</td>
        <td className="fs-5 pt-4  fw-bold text-center">{props.category}</td>
      </tr>
    </>
  );
};
export default OrderItem;
