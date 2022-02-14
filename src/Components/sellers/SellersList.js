import { Firestore, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "./../firebase-config";
import "firebase/database";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSellers } from "../Store/SellerAction";
import "./style.css";
import getOrderDetails from "../Store/ProductsAction";
import Dialog from "../Dialoge/dialog";
const SellersList = () => {
  var show = [];
  //const [UsersDocs, setUsersDocs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [FilterDocs, setFilterDocs] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(2);
  const [pages, setPages] = useState([]);
  const [CurrPage, setCurrPage] = useState(1);
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });
  const idSellerRef = useRef();
  const handleDialoag = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };
  const [deleteDialog,setDeleteDialog]=useState({
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
    dispatch(getSellers());
  }, []);
  useEffect(() => {
    paginate(Users);
    setFilterDocs(Users);
  }, [Users]);



  //******************Delete**************/
  const deleteUser =  (id) => {
    // console.log(id);
    handleDeleteDialoag("Are U Sure To Delete", true);
    idDeleteSellerRef.current=id;
    
  };
  const areUSureDelete=async(choose)=>{
    if(choose){
      const deleteuser = doc(db, "users", idDeleteSellerRef.current);
    await deleteDoc(deleteuser);
    if (currentDocs.length == 1 && CurrPage != 1) {
      setCurrPage(CurrPage - 1);
    }
    dispatch(getSellers());
    handleDeleteDialoag("", false);
  } else {
    handleDeleteDialoag("", false);
  }
  }

  /************************PanStaer*****************/
  const PaneUser = (id) => {
    handleDialoag("Are U Sure", true);
    idSellerRef.current = id;
  };
  const areUSureToPane = async (choose) => {
    if (choose) {
      let updateuser = doc(db, "users", idSellerRef.current);
      await updateDoc(updateuser, { isSeller: false });
      if (currentDocs.length == 1 && CurrPage != 1) {
        setCurrPage(CurrPage - 1);
      }
      dispatch(getSellers());
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
                You Have NO Sellers
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
                            to="/SellerDetails"
                            className="text-danger"
                            onClick={() => senddata(el.Product)}
                          >
                            <button type="button" className="btn btn-primary">
                              show details
                            </button>
                          </Link>

                          {dialog.isLoading && (
                            <Dialog
                              onDialog={areUSureToPane}
                              message={dialog.message}
                            />
                          )}

                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => PaneUser(el.id)}
                          >
                            Pane
                          </button>

                           {deleteDialog.isLoading && (
                            <Dialog
                              onDialog={areUSureDelete}
                              message={deleteDialog.message}
                            />
                          )}
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => deleteUser(el.id)}
                          >
                            {" "}
                            DELETE
                          </button> 

                        
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
                  <li className={`page-item ${CurrPage == el ? "active" : ""}`}>
                    <a class="page-link" onClick={() => goToPage(el)}>
                      {el}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SellersList;
