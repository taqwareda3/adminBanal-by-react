import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import DashBoardCard from "./dashbord-card";
import BestProducts from './bestproducts'
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
    <div className="col main pt-5  h-100 mb-5">
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
        <DashBoardCard
          color="success"
          to="SellersList"
          title={"Sellers"}
          result={UsersDocs.length}
        />

        <DashBoardCard title={"Posts"} result={87} color="warning" />

        <DashBoardCard title={"Tweets"} result={125} color="danger" />

        <DashBoardCard title={"Shares"} result={36} color="primary" />
      </div>
      <hr />

      <BestProducts/>
    </div>
  );
};
export default DashBoard;
