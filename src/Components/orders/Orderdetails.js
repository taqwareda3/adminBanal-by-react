import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OrderItem from "./orderitem";
const Products = () => {
  const products = useSelector((state) => state.products);

  return (
    <>
      <div className=" table-responsive datatable-custom" >
        <div className="shadow p-5">
        <Link to="/orders">  <button className="btn btn-success float-end my-2">Back</button></Link>
          <table
            className="table table-striped table-bordered table-sm"
            cellspacing="0"
            width="100%"
          >
            <thead className="text-center">
              <tr>
                <th class="th-sm">#</th>

                <th class="th-sm">Item</th>
                <th class="th-sm">Name</th>
                <th class="th-sm">quantity</th>
                <th class="th-sm">Category</th>
              </tr>
            </thead>
            <tbody>
              {console.log(products)}
              {products.map((prod, index) => {
                return (
                  <OrderItem
                    id={index + 1}
                    img={prod.Image}
                    name={prod.Name}
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
