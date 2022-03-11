// import { Firestore, updateDoc } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { db } from "./../firebase-config";
// import { collection, doc, onSnapshot, query, deleteDoc } from "firebase/firestore";
// import React from 'react';
// import { Link } from "react-router-dom";
// import ReactPaginate from "react-paginate";
// import { getUsers } from "../Store/userAction";
// import { useDispatch,useSelector } from "react-redux";
// import '../sellers/style.css'
// import "./user.css";

// const Users = () => {

//   const [User, setUser] = useState([]);
//   //////////page///////////
//   const [page, setPage] = useState(0);
//   const usersCount = 2;
//   const userpagesCount = page * usersCount;
//   const pageCount = Math.ceil(User.length / usersCount);

//   const changePage = ({ selected }) => {
//     setPage(selected);
//   };
//   /////////////search//////
//   // const[filterSer,setFilterSer]=useState([]);
//   // const[enterWord,setEnterWord]=useState([]);
//   // const handleSearch = (event)=>{
//   //   const sarchword = event.target.value;
//   //   setEnterWord(sarchword);
//   //   const newFilter = User.filter((value) => {
//   //     return value.title.toLowerCase().includes(sarchword.toLowerCase());
//   //   });
//   //   if (sarchword === "") {
//   //     setFilterSer([]);
//   //   } else {
//   //     setFilterSer(newFilter);
//   //   }
//   // };
//   const [search, setSearch] = useState([]);
//   //////////////////redux////////////
//   const dispatch = useDispatch();
//   const Users = useSelector((state) => state.User);

//   useEffect(() => {
//     dispatch(getUsers());
//   }, []);
//   // useEffect(() => {
//   //   paginate(Users);
//   //   setFilterDocs(Users);
//   // }, [Users]);

//   /////////////////getdata///////////

//   // useEffect(() => {
//   //   const q = query(collection(db, "users"));
//   //   let unsub = onSnapshot(q, (snap) => {
//   //     let fetched = snap.docs.map((index) => ({ ...index.data(), id: index.id }))

//   //     setUser(fetched);
//   //     // console.log(fetched);
//   //   })
//   //   return unsub;
//   // }, [])
//   ////////////////////delete///////////////

//   const del = async (id) => {

//     const deleteuser = doc(db, "users", id);
//     await deleteDoc(deleteuser);

//   };
//   //////////////upgrade//////////
//   const upgrade = async (id) => {
//     const upgrade = doc(db, "users", id);
//     await updateDoc(upgrade, { isSeller: true })
//   }

//   return (
//     <>
//       {/* <div className="item-list">
//       {User.map((item) => {
//         return <li item={item} key={item.id} >{item.email}</li>
//       })}
//     </div> */}
//       <div className="row height d-flex justify-content-center align-items-center mt-5 mb-5 ">
//         <div className="col-md-8">
//           <div className="search">

//             <i className="fa fa-search"></i>
//             <input
//               type="text"
//               className="form-control"
//               value={search}
//               placeholder="What Do You Want ?"
//               // type="text"
//               onChange={(e) => {

//                 setSearch(e.target.value)
//                 console.log(e.target.value);
//               }}

//             />
//           </div>
//         </div>
//         <button className="btn btn-primary ta col-lg-2"
//           placeholder="searh"

//         >
//           {/* {
//           User.filter(val=>{
//             if(search=="")
//             return val;
//             if (val.firstname.toLowerCase().includes(search.toLowerCase())) {
//               return val;
//             }

//           })

//         } */}
//           Search</button>

//         <div className="table-responsive text-center  mt-3">
//           <table className="table table-dark table-striped mt-5 h-100">
//             <thead>
//               <tr>
//                 <th scope="col-2">First Name</th>
//                 <th scope="col-2">Last Name</th>
//                 <th scope="col-2">Email</th>
//                 <th scope="col-2">Phone</th>
//                 <th scope="col-2">Limits!</th>
//               </tr>
//             </thead>

//             {getUsers
//               .map((item) => {
//                 return (
//                   <>
//                     <tr key={item.id}>

//                       <td>{item.firstname}</td>
//                       <td>{item.lastname}</td>

//                       <td>{item.email}</td>
//                       <td>{item.phone}</td>
//                       <td>
//                         <div
//                           className="btn-group"
//                           role="group"
//                           aria-label="Basic mixed styles example"
//                         >
//                           <Link
//                             to="/userDetails"
//                             className="text-danger"
//                             // onClick={() => senddata(el.Product)}
//                           >
//                             <button type="button" className="btn btn-primary">
//                               show details
//                             </button>
//                           </Link>

//                           <button
//                             type="button"
//                             className="btn btn-warning"
//                             onClick={() => upgrade(item.id)}
//                             disabled={item.isSeller == true}
//                           >
//                            upgrade
//                           </button>

//                           {/* {deleteDialog.isLoading && (
//                             <Dialog
//                               onDialog={areUSureDelete}
//                               message={deleteDialog.message}
//                             />
//                           )} */}
//                           <button
//                             type="button"
//                             className="btn btn-danger"
//                             onClick={() => del(item.id)}
//                           >

//                             DELETE
//                           </button>

//                         </div>
//                       </td>

//                     </tr>
//                   </>
//                 );
//               })}
//           </table>

//         </div  >
//         <div className="mt-5">
//           <ReactPaginate
//             previousLabel={"Previous"}
//             nextLabel={"Next"}
//             pageCount={pageCount}
//             onPageChange={changePage}
//             containerClassName={"paginationBttns"}
//             previousLinkClassName={"previousBttn"}
//             nextLinkClassName={"nextBttn"}
//             disabledClassName={"paginationDisabled"}
//             activeClassName={"paginationActive"}
//           />
//         </div>
//       </div>

//     </>
//   )
// }

// export default Users;
/////////////
import { Firestore, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "./../firebase-config";
import "firebase/database";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../Store/userAction";
// import "./style.css";
import getOrderDetails from "../Store/ProductsAction";
import Dialog from "../Dialoge/dialog";
const Users = () => {
  var show = [];
  //const [UsersDocs, setUsersDocs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [FilterDocs, setFilterDocs] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [pages, setPages] = useState([]);
  const [CurrPage, setCurrPage] = useState(1);
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });
  const idUserRef = useRef();
  const handleDialoag = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };
  const [deleteDialog, setDeleteDialog] = useState({
    message: "",
    isLoading: false,
  });
  const idDeleteSellerRef = useRef();
  const handleDeleteDialoag = (message, isLoading) => {
    setDeleteDialog({
      message,
      isLoading,
    });
  };
  //const Users = collection(db, "users");
  // console.log(getDocs(Users));
  const indexOfLastSeller = CurrPage * itemPerPage;
  const indexOfFirstSeller = indexOfLastSeller - itemPerPage;
  const currentDocs = FilterDocs.slice(indexOfFirstSeller, indexOfLastSeller);

  //**************************Search*****************/
  const goToPage = (page) => {
    console.log("click pge", page);
    setCurrPage(page);
  };

  const senddata = (items) => {
    console.log(items);
    dispatch(getOrderDetails(items));
  };

  const dispatch = useDispatch();
  const Users = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getUsers());
  }, []);
  useEffect(() => {
    paginate(Users);
    setFilterDocs(Users);
  }, [Users]);

  //******************Delete**************/
  const deleteUser = (id) => {
    // console.log(id);
    handleDeleteDialoag("Are U Sure To Delete", true);
    idDeleteSellerRef.current = id;
  };
  const areUSureDelete = async (choose) => {
    if (choose) {
      const deleteuser = doc(db, "users", idDeleteSellerRef.current);
      await deleteDoc(deleteuser);
      if (currentDocs.length == 1 && CurrPage != 1) {
        setCurrPage(CurrPage - 1);
      }
      dispatch(getUsers());
      handleDeleteDialoag("", false);
    } else {
      handleDeleteDialoag("", false);
    }
  };

  /************************PanStaer*****************/
  const PaneUser = (id) => {
    handleDialoag("Are U Sure", true);
    idUserRef.current = id;
  };
  const areUSureToPane = async (choose) => {
    if (choose) {
      let updateuser = doc(db, "users", idUserRef.current);
      await updateDoc(updateuser, { isSeller: false });
      if (currentDocs.length == 1 && CurrPage != 1) {
        setCurrPage(CurrPage - 1);
      }
      dispatch(getUsers());
      handleDialoag("", false);
    } else {
      handleDialoag("", false);
    }
  };
  //**********************PanEnd*******************************************//
  const paginate = (items) => {
    let startOf;
    let endOf;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(items.length / itemPerPage); i++) {
      pageNumbers.push(i);
    }
    setPages(pageNumbers);
  };
  return (
    <>
      {console.log(pages)}
      <div className="container-fluid">
        <div className="row height d-flex justify-content-center align-items-center mt-5">
          <div className="col-md-8">
            <div className="search">
              {" "}
              <i className="fa fa-search"></i>{" "}
              <input
                type="text"
                className="form-control"
                value={keyword}
                placeholder="What Do You Want ?"
                onChange={(e) => {
                  // console.log("e",e)
                  setKeyword(e.target.value);
                  console.log(e.target.value);
                  // setKeyword(e.target.value);
                  let data = Users;

                  console.log(data);
                  let newdata;
                  if (e.target.value) {
                    data =
                      Users &&
                      Users.length > 1 &&
                      Users.filter(
                        (el) =>
                          el["firstname"].includes(e.target.value) ||
                          el["lastname"].includes(e.target.value) ||
                          el["phone"].includes(e.target.value) ||
                          el["email"].includes(e.target.value)
                      );
                    //  console.log("data",filtered);
                  }
                  console.log(data);
                  setFilterDocs(data);
                  setCurrPage(1);
                  paginate(data);
                }}
              />{" "}
              <button className="btn btn-primary">Search</button>{" "}
            </div>

            {/* <div className="item-list">
      {User.map((item) => {
        return <li item={item} key={item.id} >{item.email}</li>
      })}
    </div> */}
            <div className="row height d-flex justify-content-center align-items-center mt-5 mb-5 ">
              <div className="col-md-8">
                <div className="search">
                  <i className="fa fa-search"></i>
                  <input
                    type="text"
                    className="form-control"
                    // value={search}
                    placeholder="What Do You Want ?"
                    onChange={(e) => {
                      // setSearch(e.target.value);
                      console.log(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="table-responsive text-center main">
                <table className="table table-dark table-striped mt-5">
                  <thead>
                    <tr>
                      <th scope="col-2">First Name</th>
                      <th scope="col-2">Last Name</th>
                      <th scope="col-2">Phone</th>
                      <th scope="col-2">Email</th>
                      <th scope="col-2">Limits!</th>
                    </tr>
                  </thead>

                  {console.log(currentDocs.length)}
                  {currentDocs.length == 0 ? (
                    <div
                      class="alert alert-danger fs-1 text-center m-auto "
                      role="alert"
                    >
                      You Have NO Users
                    </div>
                  ) : (
                    currentDocs.map((el) => {
                      return (
                        <>
                          <tr key={el.id}>
                            {/* <th scope="row">1</th> */}
                            <td>{el.firstname}</td>
                            <td>{el.lastname}</td>
                            <td>{el.phone}</td>
                            <td>{el.email}</td>
                            <td>
                              <div
                                className="btn-group"
                                role="group"
                                aria-label="Basic mixed styles example"
                              >
                                <Link
                                  to={`/client/${el.id}`}
                                  className="text-danger"
                                  onClick={() => senddata(el.Product)}
                                >
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                  >
                                    show details
                                  </button>
                                </Link>

                             

                              
                             
                              </div>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  )}
                </table>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <nav aria-label="Page navigation  example">
                  <ul className="pagination cursor pagination pagination-lg">
                    {pages &&
                      pages.length > 1 &&
                      pages.map((el) => (
                        <li
                          className={`page-item ${
                            CurrPage == el ? "active" : ""
                          }`}
                        >
                          <a class="page-link" onClick={() => goToPage(el)}>
                            {el}
                          </a>
                        </li>
                      ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    
    </>
  );
};

export default Users;
