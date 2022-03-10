import React, { useEffect, useState } from "react";
import "../orders/orders.scss";
import "firebase/database";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import getOrders from "../Store/OrdersAction";
import getOrderDetails from "../Store/ProductsAction";
import "./orders.css";
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
  const [selectedDate, setselectedDate] = useState(new Date());
  const dispatch = useDispatch();
  let Orders = useSelector((state) => state.orders);
  //////////search by username////////////
  const [search, setSearch] = useState([]);
  const [updateOrders, setupdateOrders] = useState([]);

  ///////////
  const paginate = (items) => {
    let startOf;
    let endOf;
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
  var numEGP = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EGP",
  });
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const sts = (arr) => {
    let hh = arr.filter((e) => {
      return e.delviredstatus != "deliverd";
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
    <>
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-12">
          <h5 className="mt-3 mb-3 text-secondary">Search By Date</h5>
        </div>

        <div className="d-flex align-items-center">
          <Datepicker
            onSelect={(selecteddate) => {
              SearchByDate(selecteddate);
            }}
            selected={selectedDate}
            onChange={(date) => setselectedDate(date)}
            maxDate={new Date()}
          />
        </div>
        <div className="col-md-10">
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
        </button>
        <table className="rwd-table">
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
          {currentDocs
            .filter((val) => {
              if (search == "") return filterOrders;
              else if (
                val.firstname.toLowerCase().includes(search.toLowerCase())
              ) {
                return val;
              }
            })
            .map((order, index) => {
              return (
                <tbody key={index}>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{numEGP.format(order.Total)}</td>
                    <td>
                      {order.status ? (
                        <span className="bg-success p-1 rounded">Completed</span>
                      ) : (
                        <span className="bg-primary p-1 rounded">
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
                          className="btn text-white fw-bold orange"
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
    </>
  );
};

export default Orders;
