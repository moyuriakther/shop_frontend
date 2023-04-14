import React from "react";
import { Link } from "react-router-dom";
import Loading from "../loadingError/Loading";
import Error from "../loadingError/Error";
import moment from "moment";

const Orders = ({ loading, error, orders }) => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error variant="alert-danger">{error}</Error>
      ) : (
        <>
          {orders?.length === 0 ? (
            <div className="col-12 alert alert-info text-center mt-3">
              No Orders
              <Link
                className="btn btn-success mx-2 px-3 py-2"
                to="/"
                style={{ fontSize: "12px" }}
              >
                START SHOPPING
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>STATUS</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order, i) => (
                    <tr
                      className={
                        order?.isPaid ? "alert-success" : "alert-danger"
                      }
                      key={i}
                    >
                      <td>
                        <a href={`/order/${order._id}`} className="link">
                          {order?._id}
                        </a>
                      </td>
                      <td>{order?.isPaid ? "Paid" : "Not Paid"}</td>
                      <td>
                        {order?.isPaid
                          ? moment(order.paidAt).calendar()
                          : moment(order.createdAt).calendar()}
                      </td>
                      <td>${order?.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
