import { Firestore, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "./../firebase-config";
import "firebase/database";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Store/productaction";
import "./style.css";

import Dialog from "../Dialoge/dialog";
const ProductsList = () => {
  var show = [];
 
  const [keyword, setKeyword] = useState("");
  const [FilterDocs, setFilterDocs] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [pages, setPages] = useState([]);
  const [CurrPage, setCurrPage] = useState(1);
  
  
  const indexOfLastSeller = CurrPage * itemPerPage;
  const indexOfFirstSeller = indexOfLastSeller - itemPerPage;
  const currentDocs = FilterDocs.slice(indexOfFirstSeller, indexOfLastSeller);


  //**************************Search*****************/
  const goToPage = (page) => {
    console.log("click pge", page);
    setCurrPage(page);
  };

 

  const dispatch = useDispatch();
  const Products = useSelector((state) => state.product);

 
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  useEffect(() => {
    paginate(Products);
    setFilterDocs(Products);
  }, [Products]);



  const paginate = (items) => {
    let startOf;
    let endOf;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(items.length / itemPerPage); i++) {
      pageNumbers.push(i);
    }
    setPages(pageNumbers);
  };
  return (
    <>
      {console.log(pages)}
      <div className="container-fluid">
        <div className="row height d-flex justify-content-center align-items-center mt-5">
          <div className="col-md-8">
            <div className="search">
              {" "}
              <i className="fa fa-search"></i>{" "}
              <input
                type="text"
                className="form-control"
                value={keyword}
                placeholder="What Do You Want ?"
                onChange={(e) => {
                  // console.log("e",e)
                  setKeyword(e.target.value);
                  console.log(e.target.value);
                  // setKeyword(e.target.value);
                  let data = Products;

                  console.log(data);
                  let newdata;
                  if (e.target.value) {
                    data =
                      Products &&
                      Products.length > 1 &&
                      Products.filter(
                        (el) =>
                          el["Name"].includes(e.target.value) ||
                          el["Description"].includes(e.target.value) ||
                          el["Category"].includes(e.target.value)
                      );
                    //  console.log("data",filtered);
                  }
                  console.log(data);
                  setFilterDocs(data);
                  setCurrPage(1);
                  paginate(data);
                }}
              />{" "}
              <button className="btn btn-primary">Search</button>{" "}
            </div>
          </div>
        </div>
        <div className="table-responsive text-center main">
          <table className="table table-dark table-striped mt-5">
            <thead>
              <tr>
               <th>Category</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Image</th>
              
              </tr>
            </thead>
           
            {console.log(currentDocs.length)}
            {currentDocs.length == 0 ? (
              <div
                class="alert alert-danger fs-1 text-center m-auto "
                role="alert"
              >
               No Products
              </div>
            ) : (
              currentDocs.map((product) => {
                return (
                  <>
                          <tr key={product.id}
                    className={`${product.Quantity < 10 ? "table-warning":""} ${product.Quantity===0? "table-danger":""}`}                   >
                      <td>{product.Category}</td>
                      <td>{product.Name}</td>
                      <td>{product.Price}</td>
                      <td>{product.Quantity}</td>
                      <td>
                        {" "}
                        {product.Description} {product.Dimensions}{" "}
                        {product.Size}
                      </td>
                      <td>
                        <img
                          className="prodImg w-2"
                          alt={product.Name}
                          src={product.Image}
                        />
                      </td>
                     <td>
                     
                          
                     </td>
                      
                    </tr>
                  </>
                );
              })
            )}
          </table>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <nav aria-label="Page navigation  example">
            <ul className="pagination cursor pagination pagination-lg">
              {pages &&
                pages.length > 1 &&
                pages.map((el) => (
                  <li className={`page-item ${CurrPage == el ? "active" : ""}`}>
                    <a class="page-link" onClick={() => goToPage(el)}>
                      {el}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default ProductsList;
