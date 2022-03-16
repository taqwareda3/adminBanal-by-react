import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";

export const Navbar = () => {
  return (


    <nav className="navbar navbar-expand-lg navbar-light nav  ">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Jumia Dashboard</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item ">
              <Link className="nav-link" href="#" to="/dashboard">
                Dashbord <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" href="#" to="/Products">
                Products <span className="sr-only">(current)</span>
              </Link>
            </li>

            <li className="nav-item ">
              <Link className="nav-link" href="#" to="/orders">
                Orders
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" href="#" to="Users">
                {" "}
                Users
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" href="#" to="/SellersList">
                Active Sellers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#" to="/sellerslistdeactive">
                Unactive Sellers
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" href="#" to="/sellerrequest">
                Requests
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" href="#" to="/category">
                Categories
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" href="#" to="/Sales">
                Sales
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default Navbar;
