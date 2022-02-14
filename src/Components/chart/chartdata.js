import React, { useEffect, useState } from "react";
import { db } from "./../firebase-config";
import PieChart from "./PieChart";
import AppChart from "./chart";
import {
  firebase,
  collection,
  getDocs,
  doc,
  query,
  where,
  addDoc,
} from "firebase/firestore";

const ChartData = () => {
  const [date, setDate] = useState({});
 
  /*useEffect(
 onSnapshot(collection(db,"Sales_Data"),(snapshot)=>setDate(snapshot.docs.map((doc)=>({...doc.data(),id:doc.id})))
 ),[]); */
  const collectionRef = collection(db, "Daily_Sales");


  
   // addDate();
  /*  setChartData({
        labels: datedata,
        data: salesdata,
        borderWidth: 1,
      }
      ) */
    
  

  
    /*
var _date = new Date();
  let midnight = _date.getUTCHours() + 2;
  let datee = _date.getDate();
  let _month = _date.getMonth() + 1;
  let total_date = `${datee} / ${_month}`;
  if (midnight.value === 24) {
    addDate();
    console.log("add date has");
  }
  console.log(datee);
  console.log(midnight);

  const addDate = async () => {
    let total_date = total_date;

    const payload = { total_date };
    const addRef = await addDoc(collectionRef, payload);
    console.log(addRef);
  };*/
  return (
    <>
      <h2></h2>
      <PieChart />
   
    </>
  );
};
export default ChartData;
