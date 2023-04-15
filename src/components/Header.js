import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../Redux/Actions/userActions";

const Header = () => {
  const [search, setSearch] = useState();
  const dispatch = useDispatch();
  const history = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      history(`/search/${search}`);
    } else {
      history("/");
    }
  };

  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <div>
      <div className="announcement">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center display-none">
              <p>+88 01794844364</p>
              <p>moyuriakther97@gmail.com</p>
            </div>
            <div className="col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
              <Link to="">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="">
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link to="">
                <i className="fab fa-youtube"></i>
              </Link>
              <Link to="">
                <i className="fab fa-pinterest-p"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <div className="container">
          {/* mobile */}
          <div className="mobile-header">
            <div className="container">
              <div className="row">
                <div className="col-6 d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <img src={logo} alt="logo" />
                  </Link>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end login-register">
                  {userInfo ? (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-user"></i>
                        {userInfo?.name}
                      </button>
                      <div className="dropdown-menu">
                        <Link to="/profile" className="dropdown-item">
                          Profile
                        </Link>
                        <Link
                          to=""
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-user"></i>
                        Hi, {userInfo?.name}
                      </button>
                      <div className="dropdown-menu">
                        <Link to="/login" className="dropdown-item">
                          login
                        </Link>
                        <Link to="/register" className="dropdown-item">
                          register
                        </Link>
                      </div>
                    </div>
                  )}
                  <Link to="/cart" className="cart-mobile-icon">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">{cartItems?.length}</span>
                  </Link>
                </div>
                <div className="col-12 d-flex align-items-center">
                  <form className="input-group" onSubmit={handleSearch}>
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search"
                      type="search"
                      className="form-control rounded search"
                    />
                    <button type="submit" className="search-button">
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* desktop */}
          <div className="pc-header">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center">
                <Link to="/" className="navbar-brand">
                  <img src={logo} alt="logo" />
                </Link>
              </div>
              <div className="col-md-6 col-8 d-flex align-items-center">
                <form className="input-group" onSubmit={handleSearch}>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                    type="search"
                    className="form-control rounded search"
                  />
                  <button type="submit" className="search-button">
                    Search
                  </button>
                </form>
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-end">
                {userInfo ? (
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Hi, {userInfo?.name}
                    </button>
                    <div className="dropdown-menu">
                      <Link to="/profile" className="dropdown-item">
                        Profile
                      </Link>
                      <Link
                        to="#"
                        className="dropdown-item"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="login-Register">
                    <Link to="/login">Login</Link>
                  </div>
                )}

                <Link to="/cart" className="cart-mobile-icon">
                  <i className="fas fa-shopping-bag"></i>
                  <span className="badge">{cartItems?.length}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
