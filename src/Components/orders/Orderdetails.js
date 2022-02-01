import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import Dashboard from "./orders";
import { useSelector } from "react-redux";
import { db } from "./../firebase-config";
const Products = (props) => {
  const [products, setproducts] = useState([]);
  const [filterd, setfilterd] = useState([]);
  const product = useSelector((state) => state);
  let x = 0;

  const getData2 = async (index) => {
    let id = index?.Product_Id.replace(/\s+/g, "");
    const docRef = doc(db, "Products", id);
    const user = await getDoc(docRef);
    console.log(user.data());
    setproducts([
      ...products,
      user.data().Category,
      user.data().Name,
      user.data().Price,
    ]);
  };

  useEffect(() => {
    product.map((index) => {
      getData2(index);
    });
  }, []);

  return (
    <>
      <div className="bg-light ">
        <div className="p-5">
          <h1>Order details</h1>
          {product.map((index) => {
            return (
              <>
                <div>
                  <span className="text-danger">Item : </span>

                  {products[1]}
                </div>
                <div>
                  <span className="text-danger">Item Price : </span>
                  {products[2]} <span className="text-danger">EGP </span>
                </div>
                <div>
                  <span className="text-danger">Total Price : </span>
                  {index.Total_Price.toFixed(3)}{" "}
                  <span className="text-danger">EGP </span>
                </div>
                <div>
                  <span className="text-danger">Category : </span>
                  {products[0]}
                </div>
                <div>
                  <span className="text-danger">Quntity: </span>
                  {index.Product_Quntity}
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
