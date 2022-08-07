import { useSelector } from "react-redux";
import OrderItem from "./orderitem";
import "./orders.css";
import "./../style/style.css";
import "./orders.scss";
import numEGP from "../../Services/NumberFormat";
const Products = () => {
  const products = useSelector((state) => state.products);
  return (
    <>
      <div className=" table-responsive text-dark datatable-custom">
        <div className=" p-5 ">
          <div>
            <a href="/orders">

              <button className="btn btn-success backDet ">Back</button>
            </a>
          </div>
          <div className=" p-5 ml-5 col-lg-10">
            <table className="rwd-table">
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
                {products.map((prod, index) => {

                  return (
                    <OrderItem
                      id={index}
                      img={prod.Image}
                      name={prod.Name}
                      price={numEGP.format(prod.details.Total_Price)}
                      quantity={prod.details.Product_Quntity}
                      category={prod.Category}
                      status={prod.details.deliveredstatus}
                    />
                  );
                })}</tbody>

            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
