import { Firestore, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./../firebase-config";
import { collection, doc, onSnapshot, query ,deleteDoc} from "firebase/firestore";
import React from 'react';
import '../sellers/style.css'
import { async } from "@firebase/util";


const Users = () => {

  const [User, setUser] = useState([]);
 
  
  
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
  const del= async(id)=>{
    const q = query(collection(db, "users",id));
    await deleteDoc(q);
  }
  
  //////////page///////////
 
 
 








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
              value=""
              placeholder="What Do You Want ?"


            />
          </div>
        </div>
        <button className="btn btn-primary ta">Search</button>

        <div className="table-responsive text-center  main mt-3">
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

            {User.map((item) => {
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

        </div>
      </div>
       
       






    </>
  )
}

export default Users;