import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getOrderDetails } from "../Redux/Actions/orderActions";
import Loading from "../components/loadingError/Loading";
import Error from "../components/loadingError/Error";
import { PayPalButton } from "react-paypal-button-v2";

const OrderScreen = () => {
  window.scrollTo(0, 0);
  const { id } = useParams();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;
  if (!loading) {
    const fixNumber = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    order.itemsPrice = fixNumber(
      order?.orderItems?.reduce(
        (acc, item) => (acc = acc + item.price * item.qty),
        0
      )
    );
  }

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);
  return (
    <>
      <Header />
      <div className="container">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error variant="alert-danger">{error}</Error>
        ) : (
          <>
            <div className="row order-detail">
              <div className="col-md-4 col-sm-4 md-lg-4 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Customer</strong>
                    </h5>
                    <p>{order?.user?.name}</p>
                    <p>
                      <a href={`mailto:${order?.user?.email}`}>
                        {order?.user?.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-truck-moving"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Order info</strong>
                    </h5>
                    <p>Shipping: {order?.shippingAddress?.country}</p>
                    <p>Pay Method: {order?.paymentMethod}</p>
                    {order?.isPaid ? (
                      <div className="bg-info col-12 p-2">
                        <p className="text-white text-center text-sm-start">
                          Paid on{moment(order.paidAt).calender()}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger col-12 p-2">
                        <p className="text-white text-center text-sm-start">
                          Not Paid
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Deliver to</strong>
                    </h5>
                    <p>
                      Address:{" "}
                      {` ${order?.shippingAddress?.city} ${order?.shippingAddress?.address} ${order?.shippingAddress?.postalCode}`}
                    </p>
                    {order?.isDelivered ? (
                      <div className="bg-info col-12 p-2">
                        <p className="text-white text-center text-sm-start">
                          Delivered on{moment(order.paidAt).calender()}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger col-12 p-2">
                        <p className="text-white text-center text-sm-start">
                          Not Delivered
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row order-products justify-content-between">
              <div className="col-lg-8">
                {order?.orderItems?.length === 0 ? (
                  <Error variant="alert-info mt-5 ">Your Order is empty</Error>
                ) : (
                  <>
                    {order?.orderItems?.map((item, i) => (
                      <div className="row order-product" key={i}>
                        <div className="col-6 col-md-3">
                          <img src={item?.image} alt="product" />
                        </div>
                        <div className="col-6 col-md-5 d-flex align-items-center">
                          <Link to={`/products/${item.product}`}>
                            <h6>{item?.name}</h6>
                          </Link>
                        </div>
                        <div className="col-6 mt-3 mt-md-0 col-md-2 d-flex align-items-center justify-content-center flex-column">
                          <h4>QUANTITY</h4>
                          <h6>{item?.qty}</h6>
                        </div>
                        <div className="col-6 mt-3 mt-md-0 col-md-2 d-flex align-items-center justify-content-center flex-column">
                          <h4>SUBTOTAL</h4>
                          <h6>${item.price * item.qty}</h6>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div className="col-lg-3 d-flex align-items-end flex-column subtotal-order mt-5">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Products</strong>
                      </td>
                      <td>${order?.itemsPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Shipping</strong>
                      </td>
                      <td>${order?.shippingPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tax</strong>
                      </td>
                      <td>${order?.taxPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total</strong>
                      </td>
                      <td>${order?.totalPrice}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="col-12">
                  {!order?.isPaid && <PayPalButton />}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderScreen;
