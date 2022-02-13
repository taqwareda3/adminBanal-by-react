import { updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./../firebase-config";
import "firebase/database";
import { doc, deleteDoc } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSellers } from "../Store/SellerAction";
import "./style.css";
import getOrderDetails from "../Store/ProductsAction";

const SellersList = () => {
  var show = [];
  //const [UsersDocs, setUsersDocs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [FilterDocs, setFilterDocs] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(2);
  const [pages, setPages] = useState([]);
  const [CurrPage, setCurrPage] = useState(1);
  //const Users = collection(db, "users");
  // console.log(getDocs(Users));
  const indexOfLastSeller = CurrPage * itemPerPage;
  const indexOfFirstSeller = indexOfLastSeller - itemPerPage;
  const currentDocs = FilterDocs.slice(indexOfFirstSeller, indexOfLastSeller);
  // const getData = async () => {
  //   const data = await getDocs(Users);
  //   setUsersDocs(data.docs.map((index) => ({ ...index.data(), id: index.id })).filter((item) => item.isSeller));
  //   // setFilterDocs(
  //   //   data.docs.map((index) => ({ ...index.data(), id: index.id })).filter((item) => item.isSeller)
  //   // );
  //   console.log(UsersDocs);
  //   // setPages(Math.ceil(data.docs.map((index) => ({ ...index.data(), id: index.id })).filter((item) => item.isSeller).length / itemPerPage))
  //   paginate(

  //     data.docs.map((index) => ({ ...index.data(), id: index.id })).filter((item) => item.isSeller)

  //   )
  // };

  //**************************Search*****************/
  const goToPage = (page) => {
    console.log("click pge", page);
    setCurrPage(page);
  };

  const senddata = (items) => {
    console.log(items);
    dispatch(getOrderDetails(items));
  };

  // const filterTable = (e) => {
  //   //e.preventDefault();
  //   setKeyword(e.target.value)
  //   console.log(e.target.value);
  //   // setKeyword(e.target.value);
  //   let data = FilterDocs.filter((el) => {
  //     return el["firstname"].includes(keyword);
  //   });
  //   console.log("data", data);

  //   // setFilterDocs(data);
  // };
  const dispatch = useDispatch();
  const Users = useSelector((state) => state.seller);

  //show=keyword==''?Users:currentDocs
  useEffect(() => {
    dispatch(getSellers());
    // paginate(Users);
    //  setFilterDocs([...Users]);
  }, []);
  useEffect(() => {
    setFilterDocs([...Users]);
  }, [Users]);

  const deleteUser = async (id) => {
    // console.log(id);
    const deleteuser = doc(db, "users", id);
    await deleteDoc(deleteuser);
    getSellers();
  };

  /************************Pan*****************/
  const PaneUser = async (id) => {
    let updateuser = doc(db, "users", id);
    await updateDoc(updateuser, { isSeller: false });
    //getSellers()
    paginate(FilterDocs);
    // setCurrPage(Math.ceil(currentDocs / itemPerPage) >= CurrPage ? CurrPage : CurrPage - 1)
  };
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
                  setKeyword(e.target.value);
                  // setKeyword(e.target.value);
                  let data = Users;

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
                  setCurrPage(0);
                  paginate(Users);
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
            {console.log(FilterDocs)}
            {console.log(Users)}
            {
              //  ((show = keyword == "" ? Users : currentDocs),
              //  currentDocs &&
              //  currentDocs.length >= 1 &&
              FilterDocs.map((el) => {
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
                          <button
                            type="button"
                            className="btn btn-warning bg-warning"
                            data-bs-toggle="modal"
                            data-bs-target="#PaneModal"
                          >
                            Pane
                          </button>
                          <div
                            className="modal fade"
                            id="PaneModal"
                            tabindex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    Modal title
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body text-warning">
                                  Are U Sure !
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    No
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-warning"
                                    data-bs-dismiss="modal"
                                    onClick={() => PaneUser(el.id)}
                                  >
                                    Pane
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            className="btn btn-danger bg-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#DeleteModal"
                          >
                            DELETE
                          </button>

                          <div
                            className="modal fade"
                            id="DeleteModal"
                            tabindex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    Modal title
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body text-danger">
                                  Are U Sure !
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    No
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-bs-dismiss="modal"
                                    onClick={() => deleteUser(el.id)}
                                  >
                                    {" "}
                                    DELETE
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })
            }
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
