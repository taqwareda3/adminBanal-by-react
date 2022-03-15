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
      <div className=" table-responsive text-dark datatable-custom mt-5 m">
        <div className="   ">
          <table className="rwd-table float-start ml-5 tablecat">
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

              <tr >
                <td> hello </td>
              </tr>
            </tbody>
          </table>
          <button type="button" name="" id=""  className="btn btn-light"> <Link className="nav-link" href="#" to="/CatForm">
                Add Category <span className="sr-only">(current)</span>
              </Link></button>
           {/* <CreateCategory/>  */}
        </div>
      </div>
    </>
  );
};

export default Cateqory;
