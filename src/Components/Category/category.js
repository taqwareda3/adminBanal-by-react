import { useEffect } from "react";
import "firebase/database";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryData } from "../Store/CateqoryAction";
import OrderItem from "../orders/orderitem";
import{CreateCategory} from './CreatCategory';

import "../orders/orders.scss";
import './../style/style.css'
const Cateqory = () => {
  const dispatch = useDispatch();
  const Cat = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategoryData());
  }, []);
  return (
    <>
      {console.log(Cat)}
      <div className=" table-responsive text-dark datatable-custom mt-5">
        <div className="  d-flex justify-content-center  ">
          <table className="rwd-table float-start tablecat">
            <thead>
              <tr>

                <th>Name</th>
                <th>Edit</th>

              </tr>
            </thead>
            <tbody>
              {Cat.map((cat) => {
                return (
                  <tr key={cat.id}>
                    <td> {cat.name} </td>
                    <td> 

                      <button type="button" name="" id="" className="btn btn-primary" > 
                    <Link  to={`/CatFormEdit/${cat.id}`}>Edit</Link>   </button>
                    </td>
                  </tr>
                );
              })}

          
            </tbody>
          </table>
        </div>
      </div>
      <div className="row d-flex justify-content-center mt-5">
          <div className="col-3 d-flex justify-content-center">
          <button type="button" name="" id=""  className="btn btn-light"> <Link className="nav-link" href="#" to="/CatForm">
                Add Category <span className="sr-only">(current)</span>
              </Link></button>
              </div>
              </div>
    </>
  );
};

export default Cateqory;
