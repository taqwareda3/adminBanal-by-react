
import React, {useState, useEffect } from "react";
import {db} from "./../firebase-config";
import { collection, getDocs, doc, query, where } from "firebase/firestore";

const SalesData = () => {

    const [data, setData] = useState([]);
    

    const dataRef = collection(db, "Daily_Sales");

    const getDate =async ()=>{
        const data = await getDocs(dataRef);
        data.map((index)=>{
            var dates = index.Date
            console.log(dates)
            var sales = index.Sales;
            console.log(sales)
        })
    }

useEffect(() => {
    getDocs(dataRef).then((Daily_Sales) => {
        setData(Daily_Sales.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      getDate();
  
      
    });

  }, []);
    return(
        <>
        <div className="row d-flex justify-content-center bg-secondary">
            <div className="col-6 h3 text-center my-2"><p>current sales</p></div>
        </div>
                <div className="row  d-flex justify-content-center my-2">

                <div  className="col-6 h4">
                <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th scope="col d-flex justify-content-center"><p>Date</p></th>
                    <th scope="col d-flex justify-content-center"><p>Total Sales</p></th>
                  </tr>
                </thead>
                <tbody>
                 {
                  data.map((data) =>{
                      return( 
                      <tr>
                          
                    <td>{data.Date}</td>
                    <td>{data.Sales}</td>
                   </tr>
                    )})}
                  
                </tbody>
              </table>
              </div>
              </div>
        </>
    )
}

export default SalesData;