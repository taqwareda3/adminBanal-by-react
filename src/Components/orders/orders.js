import React, { useEffect } from "react";
import "../orders/orders.scss";
import "firebase/database";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import getOrders from "../Store/OrdersAction";
import getOrderDetails from "../Store/ProductsAction";
import "./orders.css";
const Orders = () => {
  const senddata = (prds) => {
    console.log(prds);
    dispatch(getOrderDetails(prds));
  };

  // const getData2 = async (index) => {
  //   let id = index?.replace(/\s+/g, "");
  //   const docRef = doc(db, id);
  //   const user = await getDoc(docRef);
  //   return user.data();
  // };
  const dispatch = useDispatch();
  const Orders = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <div className="row ">
      <div className="col-lg-7 col-md-6 col-sm-12">
        <h5 className="mt-3 mb-3 text-secondary">
          Check More Records of Products
        </h5>
      </div>

      <table class="rwd-table">
        <tr>
          <th>#</th>
          <th>Total</th>
          <th>status</th>
          <th>Customer</th>
          <th>Customer email</th>
          <th>Order date</th>
          <th></th>
        </tr>
        {Orders?.map((order, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{order.Total}</td>
              <td>{order.status ? "Done" : "waiting..."}</td>
              <td>{order.firstname}</td>
              <td>{order.email}</td>
              <td>{order.date}</td>
              <td>
                <Link to="/orderDetails">
                  <button
                    onClick={() => senddata(order.Product)}
                    className="btn text-white fw-bold orange"
                  >
                    show details
                  </button>
                </Link>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Orders;
