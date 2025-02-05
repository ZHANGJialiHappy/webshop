import "../App.css";

import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  cartItemCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ cartItemCount }) => {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar sticky-top nav-bg-color navbar-light">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          src={logo}
          alt="Logo"
          width="60"
          height="60"
          className="d-inline-block align-text-top me-2"
        />
        <span className="company-name fw-light h3">OFFICIAL ONLINE STORE</span>
      </Link>
      <div className="d-flex flex-row gap-3 align-items-center">
        {user ? (
          <>
            <span className="text-white make-wider">Hi, {user}</span>
            <button className="btn btn-link text-white" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <CgProfile className="text-white fs-2" />
          </Link>
        )}

        <Link to="/cart" className="position-relative">
          <FaShoppingCart className="text-white fs-2" />
          {cartItemCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
