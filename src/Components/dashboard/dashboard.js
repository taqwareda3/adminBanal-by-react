import React, { useEffect } from "react";
import DashBoardCard from "./dashbord-card";
import { useDispatch, useSelector } from "react-redux";
import { getSellers } from "../Store/SellerAction";
import { getSellersRequest } from "../Store/sellerReqAct";
import { deActivegetSellers } from "../Store/DeActiveSellerAc";
import { getProducts } from "../Store/productaction";
import { getUnAccptProducts } from "../Store/unAcceptedpPrdAct";
import Sales from "../sales/sales ";

const DashBoard = () => {
  const dispatch = useDispatch();
  const UsersDocs = useSelector((state) => state.seller);
  const SellerRequestDocs = useSelector((state) => state.sellerRequest);
  const DeActiveSellerDocs = useSelector((state) => state.deActiveSeller);
  const Products = useSelector((state) => state.product);
  const unAccepedPrd = useSelector((state) => state.unAcceptPrd);
  console.log(UsersDocs);
  useEffect(() => {
    dispatch(getSellers());
    dispatch(getSellersRequest());
    dispatch(deActivegetSellers());
    dispatch(getProducts());
    dispatch(getUnAccptProducts());
  }, []);


  return (
    <div className="container-fluid  main pt-5  h-100 mb-5">
      <div className="row  d-flex justify-content-center">
        <div className="col-10">
          <Sales></Sales>
        </div>

      </div>
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
          icon="bi bi-person-check-fill"
        />

        <DashBoardCard
          color="danger"
          to="sellerslistdeactive"
          title={"Un Active Sellers"}
          result={DeActiveSellerDocs.length}
          icon="bi bi-person-check-fill"
        />

        <DashBoardCard
          color="primary"
          to="sellerrequest"
          title={"Seller Request"}
          result={SellerRequestDocs.length}
          icon="bi bi-person-check-fill"
        />
        <DashBoardCard
          color="success"
          to="productlist"
          title={"Products"}
          result={unAccepedPrd.length}
          icon="fa-solid fa-person"
        />

      </div>
      <hr />


    </div>
  );
};
export default DashBoard;
