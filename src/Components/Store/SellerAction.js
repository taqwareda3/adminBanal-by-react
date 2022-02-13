import { db } from "../firebase-config";

import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import "firebase/database";

const getData = async () => {
  const Users = collection(db, "users");
  const seller = await getDocs(Users);
  const UsersDocs = seller.docs
    .map((index) => ({ ...index.data(), id: index.id }))
    .filter((item) => item.isSeller);
  //    const  FilterDocs=
  //        data.docs.map((index) => ({ ...index.data(), id: index.id })).filter((item) => item.isSeller)
  //      ;
  //      setPages(Math.ceil(data.docs.map((index) => ({ ...index.data(), id: index.id })).filter((item) => item.isSeller).length / itemPerPage))
  //      const  paginate=
  //      seller.docs.map((index) => ({ ...index.data(), id: index.id })).filter((item) => item.isSeller)
  console.log(UsersDocs);
  return UsersDocs;
};

//  const getFilterdData = async () => {
//    const Users = collection(db, "users");
//    const seller = await getDocs(Users);
//    const  FilterDocs=
//    seller.docs.map((index) => ({ ...index.data(), id: index.id })).filter((item) => item.isSeller)
//     ;
//  return FilterDocs;
//    }

//    const getPaginatedData = async () => {
//         const Users = collection(db, "users");
//         const seller = await getDocs(Users);
//         const  PaginatDocs=
//         seller.docs.map((index) => ({ ...index.data(), id: index.id })).filter((item) => item.isSeller)
//          ;
//              return PaginatDocs;
//         }

export function getSellers() {
  return (dispatch) => {
    getData()
      .then((seller) => dispatch({ type: "GET_SELLERS", payload: seller }))

      .catch((err) => {
        console.log(err);
      });
  };
}

//   export function getSellerDetails(products) {
//      return (dispatch) => {
//        getProducts(products)
//          .then((prds) => dispatch({ type: "GET_PRODUCTS", payload: prds }))
//          .catch((err) => {
//            console.log(err);
//          });
//      };
//    }

// export function  getFilterdSellers  () {
//    return (dispatch) => {
//      getFilterdData()
//        .then((seller) => dispatch({ type: "GET_FILTER_SELLERS", payload: seller }))

//        .catch((err) => {
//          console.log(err);
//        });
//    };
//  }
// export  function getPaginationSellers() {
//    return (dispatch) => {
//      getPaginatedData()
//        .then((seller) => dispatch({ type: "GET_PAGINATE_SELLERS", payload: seller }))

//        .catch((err) => {
//          console.log(err);
//        });
//    };
//  }
