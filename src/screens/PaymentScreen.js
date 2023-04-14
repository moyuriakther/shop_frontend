import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../Redux/Actions/cartActions";

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!shippingAddress) {
    navigate("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeOrder");
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-">
        <form
          className="login2 col-md-8 col-lg-4 col-11"
          onSubmit={handleSubmit}
        >
          <h6>SELECT PAYMENT METHOD</h6>
          <div className="payment-container">
            <div className="radio-container">
              <input
                className="form-check-input"
                type="radio"
                // value="PayPal"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">PayPal or Credit Card</label>
            </div>
          </div>
          <button type="submit">
            {/* <Link to="/placeorder" className="text-white"> */}
            Continue
            {/* </Link> */}
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
