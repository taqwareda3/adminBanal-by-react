// import { useEffect, useState } from "react";
// import { db } from "./firebase-config";
// import { collection, getDocs, doc, query, where } from "firebase/firestore";
// import Select from "react-select";
// const Dashboard = () => {
//   const [Order, setOrders] = useState([]);
//   const [Product, setProduct] = useState([]);
//   const [user, setUser] = useState([]);
//   const OrdersCollectionRef = collection(db, "Orders");
//   const ProductsCollectionRef = collection(db, "Products");
//   const usersCollectionRef = collection(db, "users");

//   useEffect(() => {
//     const getData = async () => {
//       var p = "";
//       const Orders = await getDocs(OrdersCollectionRef)
//         .then((p = await getDocs(ProductsCollectionRef)))
//         .then(
//           p.docs.filter((i) => {
//             console.log({ ...i.data().Price });
//           })
//         );

//       setOrders(Orders.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//       const Products = await getDocs(ProductsCollectionRef);
//       setProduct(Products.docs.map((doc) => ({ ...doc.data() })));
//       const users = await getDocs(usersCollectionRef);
//       setUser(users.docs.map((doc) => ({ ...doc.data() })));
//     };

//     getData();
//   }, []);

//   return (
//     <div class="col main pt-5 mt-3">
//       <nav aria-label="breadcrumb">
//         <ol class="breadcrumb">
//           <li class="breadcrumb-item">
//             <a href="#">Home</a>
//           </li>
//           <li class="breadcrumb-item">
//             <a href="#">Library</a>
//           </li>
//           <li class="breadcrumb-item active" aria-current="page">
//             Data
//           </li>
//         </ol>
//       </nav>
//       <p class="lead d-none d-sm-block">Add Employee Details and Records</p>

//       <div class="alert alert-warning fade collapse" role="alert" id="myAlert">
//         <button
//           type="button"
//           class="close"
//           data-dismiss="alert"
//           aria-label="Close"
//         >
//           <span aria-hidden="true">×</span>
//           <span class="sr-only">Close</span>
//         </button>
//         <strong>Data and Records</strong> Learn more about employee
//       </div>
//       <div class="row mb-3">
//         <div class="col-xl-3 col-sm-6 py-2">
//           <div class="card bg-success text-white h-100">
//             <div
//               class="card-body bg-success"
//               style={{ backgroundColor: "#57b960" }}
//             >
//               <div class="rotate">
//                 <i class="fa fa-user fa-4x"></i>
//               </div>
//               <h6 class="text-uppercase">Users</h6>
//               <h1 class="display-4">134</h1>
//             </div>
//           </div>
//         </div>
//         <div class="col-xl-3 col-sm-6 py-2">
//           <div class="card text-white bg-danger h-100">
//             <div class="card-body bg-danger">
//               <div class="rotate">
//                 <i class="fa fa-list fa-4x"></i>
//               </div>
//               <h6 class="text-uppercase">Posts</h6>
//               <h1 class="display-4">87</h1>
//             </div>
//           </div>
//         </div>
//         <div class="col-xl-3 col-sm-6 py-2">
//           <div class="card text-white bg-info h-100">
//             <div class="card-body bg-info">
//               <div class="rotate">
//                 <i class="fab fa-twitter fa-4x"></i>
//               </div>
//               <h6 class="text-uppercase">Tweets</h6>
//               <h1 class="display-4">125</h1>
//             </div>
//           </div>
//         </div>
//         <div class="col-xl-3 col-sm-6 py-2">
//           <div class="card text-white bg-warning h-100">
//             <div class="card-body">
//               <div class="rotate">
//                 <i class="fa fa-share fa-4x"></i>
//               </div>
//               <h6 class="text-uppercase">Shares</h6>
//               <h1 class="display-4">36</h1>
//             </div>
//           </div>
//         </div>
//       </div>
//       <hr />

//       <div class="row ">
//         <div class="col-lg-7 col-md-6 col-sm-12">
//           <h5 class="mt-3 mb-3 text-secondary">
//             Check More Records of Products
//           </h5>
//           <div class="table-responsive">
//             <table class="table table-striped mt-3">
//               <thead class="thead-light">
//                 <tr>
//                   <th>Product name</th>
//                   <th>Price</th>
//                   <th>Quantity</th>
//                   <th>Description</th>
//                   <th></th>
//                   <th></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   {Order.map((index) => {
//                     console.log(index);
//                     return (
//                       <>
//                         <th>{}</th>
//                         <th>Price</th>
//                         <th>Quantity</th>
//                         <th>Description</th>
//                         <th></th>
//                         <th></th>
//                       </>
//                     );
//                   })}
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
