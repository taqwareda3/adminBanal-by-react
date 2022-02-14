import React, { useState, useEffect } from "react";
//import { Line } from 'react-chartjs-2';
import { db } from "./../firebase-config";
import {
  firebase,
  collection,
  getDocs,
  doc,
  query,
  where,
  onSnapshot,
  addDoc,
} from "firebase/firestore";

const PieChart = () => {
  const [totals, setTotals] = useState("");
  //const [chartData, setChartData]= useState({});
  var salesdata = [];
  var datedata = [];
  const collectionRef = collection(db, "Daily_Sales");

  const addTotals = () => {
    totals.map((index) => {
      salesdata.push(index.Sales);
      datedata.push(index.Date);
      console.log(salesdata);
      console.log(datedata);
    });
  };

  useEffect(() => {
    getDocs(collectionRef).then((Daily_Sales) => {
      setTotals(Daily_Sales.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      addTotals();
    });
    /*setChartData({
    labels: datedata,
    data: salesdata,
    borderWidth: 1,
  })*/
  }, [totals]);
  return (
    <>
      <div className="header">
        <div className="links">{salesdata[0]}</div>
      </div>
    </>
  );
};
export default PieChart;

/*<Line
        data={chartData}
        options={{
          title:{
            display:true,
            text:'Average Rainfall per month',
            fontSize:20
          },
          legend:{
            display:true,
            position:'right'
          }
        }}
      />*/
