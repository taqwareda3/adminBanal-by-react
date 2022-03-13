import { useEffect } from "react";
import "firebase/database";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryData } from "../Store/CateqoryAction";
import OrderItem from "../orders/orderitem";
import{CreateCategory} from './CreatCategory';

import "../orders/orders.scss";
const Cateqory = () => {
  const dispatch = useDispatch();
  const Cat = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategoryData());
  }, []);
  return (
    <>
      {console.log(Cat)}
      <div className=" table-responsive datatable-custom">
        <div className="shadow p-5">
          <table className="rwd-table">
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
