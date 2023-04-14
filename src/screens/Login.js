import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Actions/userActions";
import Error from "../components/loadingError/Error";
import Loading from "../components/loadingError/Loading";

const Login = () => {
  window.scrollTo(0, 0);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirect = location?.search ? location?.search.split("=")[1] : "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [redirect, navigate, userInfo]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Error variant="alert-danger">{error}</Error>}
        {loading && <Loading />}
        <form
          className="login col-11 col-md-8 col-lg-4"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <p>
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
