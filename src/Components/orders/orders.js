import React, { useEffect, useState } from "react";
import { db } from "./../firebase-config";
import "firebase/database";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import getOrders from "../Store/OrdersAction";
import getOrderDetails from "../Store/ProductsAction";
import "./orders.css";
const Orders = () => {
  const [buyer, setbuyer] = useState([]);
  const senddata = (prds) => {
    console.log(prds);
    dispatch(getOrderDetails(prds));
  };

 
  const getData2 = async (index) => {
    let id = index?.replace(/\s+/g, "");
    const docRef = doc(db, id);
    const user = await getDoc(docRef);
    return user.data();
  };
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
        <div className="table-responsive">
          <table className="table table-striped mt-3">
            <thead className="thead-light">
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
            <tbody>
              {console.log(Orders)}
              {Orders?.map((order, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <th>{order.Total}</th>
                    <th>{order.status ? "Done" : "waiting..."}</th>
                    <th>{order.firstname}</th>
                    <th>{order.email}</th>
                    <th>{order.date}</th>
                    <th>
                      <Link to="/orderDetails">
                        <button
                          onClick={() => senddata(order.Product)}
                          className="btn btn-primary"
                        >
                          show details
                        </button>
                      </Link>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
