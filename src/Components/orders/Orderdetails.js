
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import OrderItem from "./orderitem";


import "./orders.scss";
const Products = () => {
 
  const products = useSelector((state) => state.products);
  var numEGP = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EGP",
  });

 
  return (
    <>
      <div className=" table-responsive datatable-custom">
        <div className="shadow p-5">
          <Link to="/orders">
            {" "}
            <button className="btn btn-success float-end my-2">Back</button>
          </Link>
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
               {console.log(prod.id)}
                return (
                  <OrderItem
                    id={index + 1}
                    img={prod.Image}
                    name={prod.Name}
                    price={numEGP.format( prod.details.Total_Price)}
                    quantity={prod.details.Product_Quntity}
                    category={prod.Category}
                    status={prod.details.delviredstatus}
                      
                  />
                  
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Products;
