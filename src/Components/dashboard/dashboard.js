import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import DashBoardCard from "./dashbord-card";
import BestProducts from './bestproducts'
import { useDispatch, useSelector } from "react-redux";
import { getSellers } from "../Store/SellerAction";
import { getSellersRequest } from "../Store/sellerReqAct";
import { deActivegetSellers } from "../Store/DeActiveSellerAc";
import { getProducts } from "../Store/productaction";
import { getUnAccptProducts } from "../Store/unAcceptedpPrdAct";
const DashBoard = () => {
   const dispatch = useDispatch();
  const UsersDocs=useSelector((state) => state.seller);
  const SellerRequestDocs=useSelector((state) => state.sellerRequest);
  const DeActiveSellerDocs=useSelector((state) => state.deActiveSeller);
  const Products=useSelector((state) => state.product);
  const unAccepedPrd=useSelector((state) => state.unAcceptPrd);
  console.log(UsersDocs);
  useEffect(() => {
  dispatch(getSellers());
  dispatch(getSellersRequest());
  dispatch(deActivegetSellers());
  dispatch(getProducts());
  dispatch(getUnAccptProducts());
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
          title={"Active Sellers"}
          result={UsersDocs.length}
        />
        
        <DashBoardCard
          color="danger"
          to="sellerslistdeactive"
          title={"Un Active Sellers"}
          result={DeActiveSellerDocs.length}
        />
         
         <DashBoardCard
          color="primary"
          to="sellerrequest"
          title={"Seller Request"}
          result={SellerRequestDocs.length}
        />
           <DashBoardCard
          color="success"
          to="productlist"
          title={"Products"}
          result={Products.length}
        />
        <DashBoardCard
          color="danger"
          to="unacceptprd"
          title={"Un Accepted Products"}
          result={unAccepedPrd.length}
        />
        {/* <DashBoardCard title={"Posts"} result={87} color="warning" />

        <DashBoardCard title={"Tweets"} result={125} color="danger" />

        <DashBoardCard title={"Shares"} result={36} color="primary" /> */}
      </div>
      <hr />

      <BestProducts/>
    </div>
  );
};
export default DashBoard;
