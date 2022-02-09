import { Firestore, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./../firebase-config";
import { collection, doc, onSnapshot, query, deleteDoc } from "firebase/firestore";
import React from 'react';
import ReactPaginate from "react-paginate";
import '../sellers/style.css'
import "./user.css";
 


const Users = () => {

  const [User, setUser] = useState([]);
  //////////page///////////
  const [page, setPage] = useState(0);
  const usersCount = 3;
  const userpagesCount = page * usersCount;
  const pageCount = Math.ceil(User.length / usersCount);

  const changePage = ({ selected }) => {
    setPage(selected);
  };
  /////////////search//////
  // const[filterSer,setFilterSer]=useState([]);
  // const[enterWord,setEnterWord]=useState([]);
  // const handleSearch = (event)=>{
  //   const sarchword = event.target.value;
  //   setEnterWord(sarchword);
  //   const newFilter = User.filter((value) => {
  //     return value.title.toLowerCase().includes(sarchword.toLowerCase());
  //   });
  //   if (sarchword === "") {
  //     setFilterSer([]);
  //   } else {
  //     setFilterSer(newFilter);
  //   }
  // };
  const [search, setSearch] = useState([]);
  // const inputChangedHandler = (event) => {
  //    setSearch( event.target.value);
  //   // May be call for search result
  // }
  // const clear =()=>{
  //   setSearch=""

  // }



  /////////////////getdata///////////

  useEffect(() => {
    const q = query(collection(db, "users"));
    let unsub = onSnapshot(q, (snap) => {
      let fetched = snap.docs.map((index) => ({ ...index.data(), id: index.id }))



      setUser(fetched);
      // console.log(fetched);
    })
    return unsub;
  }, [])
  ////////////////////delete///////////////
  // const del= async(id)=>{
  //   const q = query(collection(db, "users",id));
  //   await deleteDoc(q);
  // }
  const del = async (id) => {

    const deleteuser = doc(db, "users", id);
    await deleteDoc(deleteuser);


  };
  //////////////upgrade//////////
  const upgrade = async (id) => {
    const upgrade = doc(db, "users", id);
     
      
        await updateDoc(upgrade, { isSeller: true })
       
     
   

  }





  return (
    <>
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
              value={search}
              placeholder="What Do You Want ?"
              type="text"
              onChange={(e) => {

                setSearch(e.target.value)
                console.log( e.target.value);
              }}


            />
          </div>
        </div>
        <button className="btn btn-primary ta"
          placeholder="searh"

        >
          {/* {
          User.filter(val=>{
            if(search=="")
            return val;
            if (val.firstname.toLowerCase().includes(search.toLowerCase())) {
              return val;
            } 
            
          })

        } */}
          Search</button>


        <div className="table-responsive text-center  mt-3">
          <table className="table table-dark table-striped mt-5 h-100">
            <thead>
              <tr>
                <th scope="col-2">First Name</th>
                <th scope="col-2">Last Name</th>
                <th scope="col-2">Email</th>
                <th scope="col-2">Phone</th>
                <th scope="col-2">Limits!</th>
              </tr>
            </thead>

            {User

              .slice(userpagesCount, userpagesCount + usersCount)
              .filter(val => {
                if (search == "")
                  return User;
                else if (val.firstname.toLowerCase().includes(search.toLowerCase())) {
                  return val
                }

              })

              .map((item) => {
                return (
                  <>
                    <tr key={item.id}>

                      <td>{item.firstname}</td>
                      <td>{item.lastname}</td>

                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>

                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic mixed styles example"
                        >
                          <button
                            type="button"
                            className="btn btn-warning bg-warning"
                            data-bs-toggle="modal"
                            data-bs-target="#PaneModal"
                            onClick={() => upgrade(item.id)}
                            disabled={item.isSeller == true}
                          >
                            Upgrade

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
                                    onClick={() => upgrade(item.id)
                                    }

                                  >
                                    upgrade

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
                            onClick={() => del(item.id)}
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
                                    onClick={() => del(item.id)}


                                  >

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
              })}
          </table>


        </div  >
        <div className="mt-5">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      </div>









    </>
  )
}

export default Users;