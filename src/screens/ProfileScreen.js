import React, { useEffect } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../Redux/Actions/userActions";
import moment from "moment";
import ProfileTable from "../components/profileComponents/ProfileTable";
import { myOrdersList } from "../Redux/Actions/orderActions";
import Orders from "../components/profileComponents/Orders";

const ProfileScreen = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  useEffect(() => {
    dispatch(myOrdersList());
    dispatch(getUserDetails("profile"));
  }, [dispatch]);
  return (
    <>
      <Header />
      <div className="container mt-3 mt-lg-5">
        <div className="row align-items-start">
          <div className="col-lg-4 p-0 shadow">
            <div className="author-card pb-0 pb-md-3">
              <div className="author-card-cover"></div>
              <div className="author-card-profile row">
                <div className="author-card-avatar col-md-5">
                  <img
                    src="https://shoeshop-youtube-zpunet.netlify.app/images/user.png"
                    alt="useProfileImage"
                  />
                </div>
                <div className="author-card-details col-md-7">
                  <h5 className="author-card-name mb-2">
                    <strong>{userInfo?.name}</strong>
                  </h5>
                  <span className="author-card-position">
                    <>Joined {moment(userInfo?.createdAt).format("LL")}</>
                  </span>
                </div>
              </div>
            </div>
            <div className="wizard pt-3">
              <div className="d-flex align-items-start">
                <div
                  className="nav col-12 nav-pills align-items-start flex-column me-3"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className="nav-link active"
                    id="v-pills-home-tab"
                    data-toggle="pill"
                    href="#v-pills-home"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                    type="button"
                  >
                    Profile Setting
                  </button>
                  <button
                    className="nav-link d-flex justify-content-between"
                    id="v-pills-profile-tab"
                    data-toggle="pill"
                    href="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    Order List{" "}
                    <span className="badge2">{orders ? orders.length : 0}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* panels */}
          <div
            className="tab-content col-lg-8 pb-5 pt-lg-0 pt-3"
            id="v-pills-tabContent"
          >
            <div
              className="tab-pane fade show active"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <ProfileTable />
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <Orders loading={loading} error={error} orders={orders} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
