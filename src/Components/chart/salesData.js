import React, { useState, useEffect } from "react";
import { db } from "./../firebase-config";
import {
  collection,
  getDocs,
  where,
  query,
  addDoc,
  orderBy,
} from "firebase/firestore";
import { PieChart } from "./PieChart";
import "./salesData.css";
const SalesData = () => {
  const [data, setData] = useState([]);
  const [sales, setSales] = useState([]);
  const [ST, setST] = useState("");

  const dataRef = query(collection(db, "Daily_Sales"), orderBy("Date"));

  const getTotals = () => {
    var totalsales = 0;
    sales.map((index) => {
      console.log(index.Total);
      totalsales += parseInt(index.Total);
    });
    setST(totalsales);
  };

  const getDate = async () => {
    const data = await getDocs(dataRef);
    data.map((index) => {
      var dates = index.Date;

      var sales = index.Sales;
    });
  };
  const dayRef = collection(db, "Daily_Sales");

  /*date*/
  var _date = new Date();
  let midnight = _date.getUTCHours() + 2;
  let datee = _date.getDate();
  let _month = _date.getMonth() + 1;
  let _year = _date.getFullYear();
  let total_date = `${_month}/${datee}/${_year}`;

  /*add new day* */
  const ordersRef = query(
    collection(db, "Orders"),
    where("date", "==", total_date.toString())
  );

  function test() {
    let Date = total_date;
    let Sales = ST;
    const payload = { Date, Sales };
    addDoc(dayRef, payload);
  }
  useEffect(() => {
    getDocs(dataRef).then((Daily_Sales) => {
      setData(Daily_Sales.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      getDate();
    });
    getDocs(ordersRef).then((Orders) => {
      setSales(Orders.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      getTotals();
    });
  }, [ST]);
  return (
    <div>
      <div className="row d-flex justify-content-center headd">
        <div className="col-6 h3 text-center my-2 text-light text-opacity-75">
          <p>current sales</p>
        </div>
      </div>
      <div className="row d-flex flex-row">
      <div className="col-3 d-flex justify-content-center">
        <div className="col-3 text-center">
        
          <div className=" rounded rounded-5" id="clickable"  onClick={() => test()}>
            <i className="fas fa-calendar-plus"></i>
          </div>
          <p className="text-dark"><strong>Add new date</strong></p>
        </div>
      </div>
      <div className="col-6  d-flex justify-content-center my-2">
        <div className="col-10 h4">
          <table className="table table-hover table-striped">
            <thead className="bg-secondary bg-opacity-50">
              <tr>
                <th scope="col">
                  <p className="d-flex justify-content-center">Date</p>
                </th>
                <th scope="col">
                  <p className="d-flex justify-content-center">Total Sales</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((data) => {
                /**/

                return (
                  <tr>
                    <td>{data.Date}</td>
                    <td>{data.Sales}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      </div>
    </div>
  );
};

export default SalesData;
