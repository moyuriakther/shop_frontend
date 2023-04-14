import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../Redux/Actions/cartActions";
import { useNavigate } from "react-router";

const ShippingScreen = () => {
  window.scrollTo(0, 0);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    setAddress(shippingAddress?.address);
    setCity(shippingAddress?.city);
    setPostalCode(shippingAddress?.postalCode);
    setCountry(shippingAddress?.country);
  }, [shippingAddress]);

  const submitHandlers = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-">
        <form
          onSubmit={submitHandlers}
          className="login col-11 col-md-8 col-lg-4"
        >
          <h6>DELIVERY ADDRESS</h6>
          <input
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <button type="submit">Continue</button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
