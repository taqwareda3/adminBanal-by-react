import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg text-warning bg-light mb-0">
      <div className="container">
        <Link className="navbar-brand" href="#" to="/wel">
          Admin panal
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
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
                Orders <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" href="#" to="Users">
                {" "}
                Users <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" href="#" to="/SellersList">
                Sellers <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" href="#" to="/Sales">
                Sales <span className="sr-only">(current)</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
