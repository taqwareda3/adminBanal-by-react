import React, { useEffect, useState, useContext } from "react";
import { db } from "./../firebase-config";
import "firebase/database";
import Products from "./Orderdetails";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useDispatch} from 'react-redux';
import  getProducts from "../Store/action"
import './orders.css' 
const Dashboard = () => {
  const Users= collection(db,"users")

const [UsersDocs, setUsersDocs] = useState([]);

console.log(getDocs(Users));

const getSeller = async () => {

  const data = await getDocs(Users);

  setUsersDocs(data.docs.map((index) => ({ ...index.data(), id: index.id })).filter((item) => item.isSeller));

};
  const [orders, setorders] = useState([]);

  const [state, setstate] = useState(false);
  const [prd, setprd] = useState([]);
  const dispatch =useDispatch()

  const change = (id) => {
    console.log(id);
    dispatch(getProducts(id))
   // setprd(id);
  };
  useEffect(() => {
    const getData = async () => {
      const OrdersCollectionRef = collection(db, "Orders");

      const Orders = await getDocs(OrdersCollectionRef);
      setorders(Orders.docs.map((doc) => ({ ...doc.data() })));
    };
    getData();
    getSeller();
  }, []);

  return (
    <div className="col main pt-5 mt-3 h-100 mb-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Library</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Data
          </li>
        </ol>
      </nav>
      <p className="lead d-none d-sm-block">Add Employee Details and Records</p>

      <div className="alert alert-warning fade collapse" role="alert" id="myAlert">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close</span>
        </button>
        <strong>Data and Records</strong> Learn more about employee
      </div>
      <div className="row mb-3">
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card bg-success text-white h-100">
            <div
              className="card-body bg-success"
              style={{ backgroundColor: "#57b960" }}
            >
              <div className="rotate">
                <i className="fa fa-user fa-4x"></i>
              </div>
              <Link to="/SellersList" className="text-white text-decoration-none">
              <h6 className="text-uppercase" >Sellers</h6>
              <h1 className="display-4">{UsersDocs.length}</h1>
              </Link>
              
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card text-white bg-danger h-100">
            <div className="card-body bg-danger">
              <div className="rotate">
                <i className="fa fa-list fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Posts</h6>
              <h1 className="display-4">87</h1>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card text-white bg-info h-100">
            <div className="card-body bg-info">
              <div className="rotate">
                <i className="fab fa-twitter fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Tweets</h6>
              <h1 className="display-4">125</h1>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card text-white bg-warning h-100">
            <div className="card-body">
              <div className="rotate">
                <i className="fa fa-share fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Shares</h6>
              <h1 className="display-4">36</h1>
            </div>
          </div>
        </div>
      </div>
      <hr />

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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((index,id) => {
                  return (
                    <>
                      <tr>
                      <th>{id}</th>
                        <th>{index.Total}EGP</th>
                        <th>{index.status?"Done":"Waiting..."}</th>
                        <th>
                          <Link
                            to="/orderDetails"
                            onClick={() => {
                              change(index.Product);
                            }}
                          >Show order</Link>
                        </th>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
