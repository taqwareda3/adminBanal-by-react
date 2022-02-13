import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import getBestProducts from "../Store/BestProductsAction";
import "../orders/orders.scss";
const BestProducts = () => {
  const dispatch = useDispatch();
  const BestProducts = useSelector((state) => state.best_products);
  useEffect(() => {
    dispatch(getBestProducts());
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-6">
          <h5 className="mt-3 mb-3 text-secondary">Best seller</h5>

          <table className="rwd-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>First Availability time</th>
              </tr>
            </thead>
            <tbody>
              {BestProducts.map((prd, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{prd.Name}</td>
                    <td>{prd.Price}</td>
                    <td>First Availability time</td>
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
export default BestProducts;
