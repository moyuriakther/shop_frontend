import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../loadingError/Toast";
import Error from "../loadingError/Error";
import Loading from "../loadingError/Loading";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../Redux/Actions/userActions.js";

const ProfileTable = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toastId = React.useRef(null);
  const toastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const { loading: updateLoading } = userProfileUpdate;

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
  }, [user]);
  const handleSubmit = (e) => {
    e.preventDefault();
    // check match password
    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(
          "Password does not matched",
          toastObjects
        );
      }
    } else {
      dispatch(updateUserProfile({ _id: user._id, name, email, password }));
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success(
          "Profile Update Successfully",
          toastObjects
        );
      }
    }
  };
  return (
    <>
      <Toast />
      {error && <Error variant="alert-danger">{error}</Error>}
      {(loading || updateLoading) && <Loading />}
      <form className="row form-container" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-fn">User Name</label>
            <input
              id="account-fn"
              className="form-control"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-email">E-Mail Address</label>
            <input
              id="account-email"
              className="form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">New Password</label>
            <input
              id="account-pass"
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-confirm-pass">Confirm Password</label>
            <input
              id="account-confirm-pass"
              className="form-control"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="px-30 mx-auto">
          Update Profile
        </button>
      </form>
    </>
  );
};

export default ProfileTable;
