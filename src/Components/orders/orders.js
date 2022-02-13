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

  const SearchByDate = (selecteddate) => {
    const date = selecteddate.toLocaleString("en").split(",")[0];

    setfilterOrders([...Orders.filter((order) => order["date"] == date)]);
  };
  var numEGP = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EGP",
  });
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  useEffect(() => {
    setfilterOrders([...Orders]);
  }, [Orders]);
  return (
    <>
      <div className="row">
        <div className="col-lg-7 col-md-6 col-sm-12">
          <h5 className="mt-3 mb-3 text-secondary">Search By Date</h5>
        </div>
        <div className="d-flex align-items-center">
          <Datepicker
            onSelect={(selecteddate) => {
              SearchByDate(selecteddate);
            }}
            selected={selectedDate}
            onChange={(date) => setselectedDate(date)}
            maxDate={new Date()}
          />
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
                  <td>{numEGP.format(order.Total)}</td>
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
