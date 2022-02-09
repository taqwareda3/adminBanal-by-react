import React, { useEffect, useState } from "react";
import { db } from "./../firebase-config";
import { collection, getDocs, doc, query, where } from "firebase/firestore";
import Select from "react-select";

const Sales = () => {

  const [sales, setSales] = useState([]);
  const [profit, setProfit] = useState("");

  const [ST, setST] = useState("");
  const ordersRef = collection(db, "Orders");

  var totalsales = 0
  
  var totalprofit = 0


  const getTotals = () => {

    sales.map((index) => {
      console.log(index.Total)
      var profits = parseInt(index.Total) * 0.1
      totalsales += parseInt(index.Total)
      totalprofit += profits
      setST(totalsales)
      setProfit(totalprofit)

      console.log(profits)
    })
    console.log(setProfit)
  }



  useEffect(() => {

    const getData = async () => {
      const Orders = await getDocs(ordersRef)
      setSales(Orders.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

      )

    }
    getTotals()
    getData()

  }, [])



  return (
   
    <div className="row my-5">
      <div class="col-lg-4 col-6 col-sm-6 py-2">
        <div class="card text-white bg-danger h-100">
          <div class="card-body bg-danger">
            <div className="row">
              <div className="col-lg-2 col-12">
                <i class="fas fa-percent fa-4x"></i>
              </div>
              <div className="col-lg-6 col-12  d-flex align-items-center">
                <h6 class="text-uppercase h3">profit</h6>
              </div>
            </div>

            <h1 class="display-4 my-3">
              {profit}</h1>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-6 col-sm-6 py-2">
        <div class="card text-white  h-100">
          <div class="card-body bg-success">
            <div className="row">
              <div className="col-lg-3 col-12">
                <i class="fas fa-money-bill-wave-alt fa-4x"></i>
              </div>
              <div className="col-lg-6 col-12 d-flex align-items-center">
                <h6 class="text-uppercase h3">Total Sales</h6>
              </div>
            </div>
            <h1 class="display-4 my-3 ">
              {ST}</h1>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Sales;