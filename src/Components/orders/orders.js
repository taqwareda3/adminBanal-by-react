import React, { useEffect, useState } from "react";
// import "../orders/orders.scss";
import "firebase/database";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import getOrders from "../Store/OrdersAction";
import getOrderDetails from "../Store/ProductsAction";
// import "./orders.css";
import'./../style/style.css'
const Orders = () => {
  const [filterOrders, setfilterOrders] = useState([]);

  const [itemPerPage, setItemPerPage] = useState(5);
  const [pages, setPages] = useState([]);
  const [CurrPage, setCurrPage] = useState(1);
  const indexOfLastSeller = CurrPage * itemPerPage;
  const indexOfFirstSeller = indexOfLastSeller - itemPerPage;
  const currentDocs = filterOrders.slice(indexOfFirstSeller, indexOfLastSeller);
  const goToPage = (page) => {
    console.log("click pge", page);
    setCurrPage(page);
  };
  //*******************************************/
  const senddata = (prds) => {
    console.log(prds);
    dispatch(getOrderDetails(prds));
  };
  const clear = () => {
    console.log(";lkjhgf");
    setfilterOrders([...updateOrders]);
  };
  const [selectedDate, setselectedDate] = useState(new Date());
  const dispatch = useDispatch();
  let Orders = useSelector((state) => state.orders);
  //////////search by username////////////

  const [updateOrders, setupdateOrders] = useState([]);

  ///////////
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
  const Filterstat = (word) => {
    setfilterOrders([
      ...updateOrders.filter((order) => order["status"] == word),
    ]);
  };
  var numEGP = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EGP",
  });
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const sts = (arr) => {
    let hh = arr.filter((e) => {
      return e.deliveredstatus != "deliverd";
    });
    if (hh.length > 0) {
      return false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    Orders = Orders.map((e) => {
      return { ...e, buyer: e.buyer.id, status: sts(e.Product) };
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
          class="btn-check "
          onClick={() => Filterstat(true)}
          name="options-outlined"
          id="primary-outlined"
          autocomplete="off"
        />
        <label class="btn btn-outline-Primary mx-2" for="primary-outlined">
          Completed
        </label>

        <input
          type="radio"
          onClick={() => Filterstat(false)}
          class="btn-check"
          name="options-outlined"
          id="danger-outlined"
          autocomplete="off"
        />
        <label class="btn btn-outline-Primary mx-2" for="danger-outlined">
          Not Completed
        </label>
        <input
          type="radio"
          onClick={()=>clear()}
          class="btn-check"
          name="options-outlined"
          id="warning-outlined"
          autocomplete="off"
        />
        <label class="btn btn-outline-warning" for="warning-outlined">
          Reset
        </label>
          </div>
        </div>
        {/* <div className="col-md-10">
          <div className="search">
            <i className="fa fa-search"></i>
            <input
              type="text"
              className="form-control"
              value={search}
              placeholder="who user you want ?"
              onChange={(e) => {
                setSearch(e.target.value);
                // console.log( e.target.value);
              }}
            />
          </div>
        </div>
        <button className="btn btn-primary ta col-lg-2" placeholder="searh">
          search
            </button> */}
       
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
          {console.log(currentDocs)}
          {currentDocs.map((order, index) => {
            return (
              <tbody key={index}>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{numEGP.format(order.Total)}</td>
                  <td>
                    {order.status ? (
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
              </tbody>
            );
          })}
        </table>
      </div>

      <div className="d-flex justify-content-center align-items-center">
        <nav aria-label="Page navigation  example">
          <ul className="pagination cursor pagination pagination-lg">
            {pages &&
              pages.length > 1 &&
              pages.map((el) => (
                <li className={`page-item ${CurrPage == el ? "active" : ""}`}>
                  <a class="page-link" onClick={() => goToPage(el)}>
                    {el}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Orders;
