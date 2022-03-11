import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import OrderItem from "./orderitem";
import getOrderDetails from "../Store/ProductsAction";

import "./orders.scss";
const Products = () => {
  
  const products = useSelector((state) => state.products);
console.log(products);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, []);

  var numEGP = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EGP",
  });
  
  return (
    <>

      <div className="d-flex justify-content-around">
        <div className=" table-responsive datatable-custom">
          <table className="rwd-table float-start">
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Name</th>
                <th>Pice</th>
                <th>quantity</th>
                <th>Category</th>

                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {
              products.map((prod, index) => {
                
                return (
                  <OrderItem
                    id={index + 1}
                    img={prod.Image}
                    name={prod.Name}
                    category={prod.Category}
                    status={prod.delviredstatus}
                    price={numEGP.format(prod.Total_Price)}
                    quantity={prod.Product_Quntity}
                  />
                )
              }
            )}
            
            </tbody>
          </table>
        </div>
        <div>
          <Link to="/orders">
            <button className="btn btn-success float-end my-2">Back</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Products;
