import React, { useEffect, useState } from "react";
import "firebase/database";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import getOrders from "../Store/OrdersAction";
import getOrderDetails from "../Store/ProductsAction";
import './../style/style.css'
import numEGP from "../../Services/NumberFormat";
import UpdateOrderState from "../../Services/updateOrderState";
import Pagination from '../pagination/Pagination'
const Orders = () => {

  const [filterOrders, setfilterOrders] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [pages, setPages] = useState([]);
  const [CurrPage, setCurrPage] = useState(1);
  const indexOfLastSeller = CurrPage * itemPerPage;
  const indexOfFirstSeller = indexOfLastSeller - itemPerPage;
  const currentDocs = filterOrders.slice(indexOfFirstSeller, indexOfLastSeller);
  const [selectedDate, setselectedDate] = useState('');
  const [updateOrders, setupdateOrders] = useState([]);
  const dispatch = useDispatch();
  let Orders = useSelector((state) => state.orders);

  const goToPage = (page) => {
    console.log("click pge", page);
    setCurrPage(page);
  };
  const senddata = (prds) => {

    dispatch(getOrderDetails(prds));
  };
  const clear = () => {
    setfilterOrders([...updateOrders]);
    setselectedDate('')
  };
  const paginate = (items) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(items.length / itemPerPage); i++) {
      pageNumbers.push(i);
    }
    setPages(pageNumbers);
  };
  const SearchByDate = (selecteddate) => {
    const date = selecteddate.toLocaleString("en").split(",")[0];

    setfilterOrders([...updateOrders.filter((order) => order["date"] == date)]);
  };
  useEffect(() => {
    dispatch(getOrders());

  }, []);

  useEffect(() => {
    Orders = Orders.map((e) => {
      return { ...e, buyer: e.buyer.id, status: UpdateOrderState(e.Product) };
    });
    paginate(Orders);
    setupdateOrders([...Orders]);
  }, [Orders]);
  useEffect(() => {
    setfilterOrders([...updateOrders]);
  }, [updateOrders]);
  return (
    <div className=" d-flex align-items-center justify-content-between flex-column">
      <div className=" container row all d-flex align-items-center justify-content-between">
        <div className="col-lg-3 col-md-6 col-sm-12">
          <h5 className="mt-3 mb-3 text-secondary">Search By Date</h5>
        </div>

        <div className="d-flex align-items-center justify-content-between">
          <Datepicker
            className="date"
            onSelect={(selecteddate) => {
              SearchByDate(selecteddate);
            }}
            selected={selectedDate}
            onChange={(date) => setselectedDate(date)}
            maxDate={new Date()}
          />
          <div>

            <input
              type="radio"
              onClick={() => clear()}
              className="btn-check"
              name="options-outlined"
              id="warning-outlined"

            />
            <label className="btn btn-outline-warning text-dark" htmlFor="warning-outlined">
              Reset
            </label>
          </div>
        </div>


        <table className="rwd-table text-dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Total</th>
              <th>status</th>
              <th>Customer number</th>

              <th>Order date</th>
              <th></th>
            </tr>
          </thead>
          <tbody >
            {currentDocs.map((order, index) => {
              return (

                <tr key={index.toString()}>
                  <td>{index + 1}</td>
                  <td>{numEGP.format(order.Total)}</td>
                  <td>

                    {

                      order.status ? (
                        <span className="bg-success p-1 rounded">Completed</span>
                      ) : (
                        <span className="bg-light p-1 rounded">
                          Not Completed...
                        </span>
                      )}
                  </td>
                  <td>
                    <Link to={`/client/${order.buyer}`}>
                      <a className="pointer">{order.buyer.substr(0, 7)}</a>
                    </Link>
                  </td>
                  <td>{order.date}</td>
                  <td>
                    <Link to={`/orderDetails/${order.id}`}>
                      <button
                        onClick={() => senddata(order.Product)}
                        className="btn btn-success text-white fw-bold "
                      >
                        show details
                      </button>
                    </Link>
                  </td>
                </tr>

              );
            })}
          </tbody>
        </table>
      </div>
      {currentDocs.length > 0 ?

        <Pagination pages={pages} CurrPage={CurrPage} goToPage={goToPage} /> : <h1>No Orders</h1>}

    </div>
  );
};

export default Orders;
