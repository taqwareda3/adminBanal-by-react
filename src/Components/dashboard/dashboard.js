import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";

const DashBoard = () => {
  const [UsersDocs, setUsersDocs] = useState([]);
  const Users = collection(db, "users");

  const getSeller = async () => {
    const data = await getDocs(Users);

    setUsersDocs(
      data.docs
        .map((index) => ({ ...index.data(), id: index.id }))
        .filter((item) => item.isSeller)
    );
  };
  useEffect(() => {
    getSeller();
  }, []);
  return (
    <div className="col main pt-5 mt-3 h-100 mb-5">
      
      <div
        className="alert alert-warning fade collapse"
        role="alert"
        id="myAlert"
      >
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
              <Link
                to="/SellersList"
                className="text-white text-decoration-none"
              >
                <h6 className="text-uppercase">Sellers</h6>
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
    </div>
  );
};
export default DashBoard;
