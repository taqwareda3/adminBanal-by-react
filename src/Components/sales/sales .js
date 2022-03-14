import React, { useEffect, useState } from "react";
import { db } from "./../firebase-config";
import {firestore, collection, getDocs, doc, query, where, addDoc, } from "firebase/firestore";
import Select from "react-select";
import { Link } from "react-router-dom";
import { PieChart } from "../chart/PieChart";
// import './sales.css'


const Sales = () => {
 
    const [sales, setSales] = useState([]);
  const [profit, setProfit] = useState("");

  const [ST, setST] = useState("");
 const ordersRef = collection(db, "Orders");
  
 


  const getTotals = () => {
      var totalsales = 0;
        
        var totalprofit = 0;
        
      sales.map((index) => {
      console.log(index.Total)
      var profits = parseFloat(index.Total) * 0.1
      totalsales += parseInt(index.Total)
      totalprofit += profits
     
      console.log(profits)
    })
      
    
     setST(totalsales)
      setProfit(totalprofit)

    console.log(setProfit)
  }



  useEffect(() => {
    getDocs(ordersRef).then((Orders)=>{
      setSales(Orders.docs.map((doc)=>({...doc.data(),id:doc.id})))
      getTotals();
    })

  }, [ST, profit])



  return (
   <div className="row my-5 d-flex justify-content-center">
     
    <div className="row my-5 d-flex justify-content-center">
      
      <div class="col-lg-6 col-5 col-sm-6 py-2">
        <div class="card text-white">
          <div class="card-body bg-success bg-obacity-25">
            <div className="row">
              <div className="col-lg-2 col-12">
                <i class="fas fa-percent fa-4x"></i>
              </div>
              <div className="col-lg-6 col-12  d-flex align-items-center justify-content-between">
                <h6 class="text-uppercase h3">profit</h6>
              </div>
            <h1 class="display-4 my-3 text-light text-center">
              {profit}</h1>
            </div>

          </div>
        </div>
      </div>
     
      <div class="col-lg-6 col-5 col-sm-6 py-2">
        <Link to="/salesDetails" style={{textDecoration: 'none' }}>
        <div class="card text-white ">
          <div class="card-body bg-secondary">
            <div className="row">
              <div className="col-lg-2 col-12">
                <i class="fas fa-money-bill-wave-alt fa-4x"></i>
              </div>
              <div className="col-lg-6 col-12 d-flex align-items-center">
                <h6 class="text-uppercase h3">Total Sales</h6>
              </div>
              <h1 class="display-4 my-3 text-light text-center">
              {ST}</h1>
            </div>
            
          </div>
        </div>
        </Link>
      </div>
      

    </div>
    <div className="row">
       <PieChart/>
     </div>
    </div>
  )
}

export default Sales;