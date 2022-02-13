import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OrderItem from "./orderitem";
import "./orders.scss";
const Products = () => {
  const products = useSelector((state) => state.products);

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
              </tr>
            </thead>
            <tbody>
              {products.map((prod, index) => {
                return (
                  <OrderItem
                    id={index + 1}
                    img={prod.Image}
                    name={prod.Name}
                    price={prod.Price}
                    quantity={prod.details.Product_Quntity}
                    category={prod.Category}
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
