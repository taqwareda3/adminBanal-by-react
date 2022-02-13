import React, { useEffect, useState } from "react";
import "../orders/orders.scss";
import "firebase/database";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  const [selectedDate, setselectedDate] = useState(new Date());
  const dispatch = useDispatch();
  const Orders = useSelector((state) => state.orders);
  const [filterOrders, setfilterOrders] = useState([]);

  const jjj = (k) => {
    const date = k.toLocaleString("en").split(",")[0];
    console.log(date);
  
    setfilterOrders([...Orders.filter((order) => order["date"] == date)]);
  };
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  useEffect(() => {
    setfilterOrders([...Orders]);
  }, [Orders]);
  return (
    <>
      <div className="row">
        <Datepicker
          onSelect={(k) => {
            jjj(k);
          }}
          selected={selectedDate}
          onChange={(date) => setselectedDate(date)}
          maxDate={new Date()}
        />
      </div>
      <div className="row">
        <div className="col-lg-7 col-md-6 col-sm-12">
          <h5 className="mt-3 mb-3 text-secondary">
            Check More Records of Products
          </h5>
        </div>

        <table className="rwd-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Total</th>
              <th>status</th>
              <th>Customer</th>
              <th>Customer email</th>
              <th>Order date</th>
              <th></th>
            </tr>
          </thead>
          {filterOrders.map((order, index) => {
            return (
              <tbody key={index}>
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
              </tbody>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Orders;
