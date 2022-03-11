import { useEffect } from "react";
import "firebase/database";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryData } from "../Store/CateqoryAction";
import OrderItem from "../orders/orderitem";
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
              </tr>
            </thead>
            <tbody>
              {Cat.map((cat) => {
                return (
                  <tr key={cat.id}>
                    <td> {cat.name} </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Cateqory;
