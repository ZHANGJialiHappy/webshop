import logo from "../assets/logo.jpg";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import "../App.css";
import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <nav className="navbar sticky-top nav-bg-color navbar-light">
      <Link className="navbar-brand d-flex align-items-center" to="../">
        <img
          src={logo}
          alt="Logo"
          width="60"
          height="60"
          className="d-inline-block align-text-top me-2"
        />
        <span className="company-name fw-light h3">OFFICIAL ONLINE STORE</span>
      </Link>
      <div className="d-flex flex-row gap-3">
        <Link to="../login">
          <CgProfile className="text-white fs-2" />
        </Link>
        <Link to="../cart">
          <FaShoppingCart className="text-white fs-2" />
        </Link>
      </div>
    </nav>
  );
};
