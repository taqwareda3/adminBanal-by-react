import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import "../orders/orders.css";
import Dashboard from "./orders";
import { useSelector } from "react-redux";
import { db } from "./../firebase-config";
const Products = () => {
  const products = useSelector((state) => state.order_details);
  const [iii, setprd] = useState([]);
  const getData2 = async (index) => {
    let id = index?.replace(/\s+/g, "");
    const docRef = doc(db, "Products", id);
    const user = await getDoc(docRef);
    return user.data();
  };
  useEffect(() => {
    products.map((item) =>
      getData2(item.Product_Id)
        .then((s) => ((item.name = s.Name), (item.img = s.Image)))
        .then(() => setprd(products))
    );
  }, []);

  return (
    <>
      <div className="bg-light ">
        <div className="p-5">
          <h1>Order details</h1>
          {console.log(iii)}
          {products?.map((item) => {
            return (
              <>
                <div className="card">
                  <img src={item.img} class="card-img-top orderimg" />
                  <div className="card-body">
                    <h5 className="card-title">
                      <span className="fs-3 fw-bold text-danger">
                        Product name:{" "}
                      </span>
                      {item.name}
                    </h5>
                    <p className="card-text fs-3">
                      <span className=" fw-bold text-danger">Quantity: </span>
                      {item.Product_Quntity} items
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Products;
