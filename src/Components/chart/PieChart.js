import React, { useState, useEffect } from "react";
//import { Line } from 'react-chartjs-2';
import { db } from "./../firebase-config";
import { Chart } from 'primereact/chart';
import {
  firebase,
  collection,
  getDocs,
  doc,
  query,
  where,
  onSnapshot,
  addDoc, orderBy
} from "firebase/firestore";

export const PieChart = ({Date, Sales}) => {
  
  const [data, setData] = useState([]);
  const dataRef = query(collection(db, "Daily_Sales"), orderBy('Date'));
  useEffect(() => {
    getDocs(dataRef).then((Daily_Sales) => {
        setData(Daily_Sales.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    });
  },[])
  let label = []
  let sales =[]
  data.map(e=>{
    label.push(e.Date)
    sales.push(e.Sales)
  })
  const basicData = {
      labels: label,
      datasets: [
          {
              label: 'Daily Sales',
              data: sales,
              fill: true,
              borderColor: '#42A5F8',
              tension: .3,
              backgroundColor: '#00994c'
          },
      ]
  };

  const getLightTheme = () => {
      let basicOptions = {
          maintainAspectRatio: false,
          aspectRatio: .6,
          plugins: {
              legend: {
                  labels: {
                      color: '#495057'
                  }
              }
          },
          scales: {
              x: {
                  ticks: {
                      color: '#495057'
                  },
                  grid: {
                      color: '#ebedef'
                  }
              },
              y: {
                  ticks: {
                      color: '#495057'
                  },
                  grid: {
                      color: '#ebedef'
                  }
              }
          }
      };
      return {
          basicOptions,
          
      }
  }

  const { basicOptions,  } = getLightTheme();

  return (
      <div>
          <div className="card">
              <h5>Basic</h5>
              <Chart type="bar" data={basicData} options={basicOptions} />
          </div>

      </div>
  )
}

             
  
 // const [totals, setTotals] = useState("");
  //const [chartData, setChartData]= useState({});
  //var salesdata = [];
  //var datedata = [];
  /*const collectionRef = collection(db, "Daily_Sales");

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
  })
  }, [totals]);
  return (
    <>
      
    </>
  );
};
*/


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
