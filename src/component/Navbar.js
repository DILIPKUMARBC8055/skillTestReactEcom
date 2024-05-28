import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./Navbar.css";
import { cartSelector } from "../features/Cart/cartReducer";

const Navbar = () => {
  const cartItems = useSelector(cartSelector).items;
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <Link to="/">E-Commerce</Link>
          </div>
          <div className="nav-links">
            <ul>
              <li>
                <NavLink to="/" activeClassName="active-link">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart" activeClassName="active-link">
                  Cart ({cartItems.length})
                </NavLink>
              </li>
              <li>
                <NavLink to="/addProduct" activeClassName="active-link">
                  Add Product
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
