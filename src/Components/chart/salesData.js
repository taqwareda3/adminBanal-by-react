
import React, {useState, useEffect } from "react";
import {db} from "./../firebase-config";
import { collection, getDocs, where, query, addDoc, orderBy } from "firebase/firestore";

const SalesData = () => {

    const [data, setData] = useState([]);
    const [sales, setSales] = useState([]);
    const [ST, setST] = useState("");

    const dataRef = query(collection(db, "Daily_Sales"), orderBy('Date'));

    const getTotals = () => {
      var totalsales = 0;
      sales.map((index) => {
      console.log(index.Total)
      totalsales += parseInt(index.Total)
    })
     setST(totalsales)
  }

    const getDate =async ()=>{
        const data = await getDocs(dataRef);
        data.map((index)=>{
            var dates = index.Date
      
            var sales = index.Sales;
            
        })
    }
    const dayRef = collection(db, "Daily_Sales")

    /*date*/
    var _date = new Date();
  let midnight = _date.getUTCHours() + 2;
  let datee = _date.getDate();
  let _month = _date.getMonth() + 1;
  let _year = _date.getFullYear()
  let total_date = `${_month}/${datee}/${_year}`;

   /*add new day* */
  const ordersRef = query(collection(db, "Orders"), where('date', "==", total_date.toString()));

   function test(){
 
       let Date= total_date
       let Sales=ST
       const payload = {Date, Sales}
       addDoc(dayRef,payload);
     }
useEffect(() => {
    getDocs(dataRef).then((Daily_Sales) => {
        setData(Daily_Sales.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      getDate();
    });
    getDocs(ordersRef).then((Orders)=>{
      setSales(Orders.docs.map((doc)=>({...doc.data(),id:doc.id})))
      getTotals();
    })
  }, [ST]);
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
              <button onClick={()=>test()}>test</button>
        </>
    )
}

export default SalesData;