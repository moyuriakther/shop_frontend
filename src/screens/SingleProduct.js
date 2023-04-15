import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Rating from "../components/homeComponents/Rating";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReview,
  productDetailPage,
} from "../Redux/Actions/ProductActions";
import Loading from "../components/loadingError/Loading";
import Error from "../components/loadingError/Error";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/actionTypes/ProductActionTypes";
import moment from "moment";

const SingleProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;
  // console.log(product);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: reviewLoading,
    error: reviewError,
    success,
  } = productReviewCreate;
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (success) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(productDetailPage(productId));
  }, [dispatch, productId, success]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    navigate(`/cart/${productId}?qty=${qty}`, { replace: true });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProductReview(productId, { rating, comment }));
  };
  return (
    <>
      <Header />
      <div className="container single-product">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error variant="alert-danger">{error}</Error>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="single-image">
                  <img src={product?.image} alt={product?.name} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    <div className="product-name">{product?.name}</div>
                  </div>
                  <p>{product?.description}</p>
                  <div className="product-count col-lg-7">
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Price</h6>
                      <span>${product?.price}</span>
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Status</h6>
                      {product?.countInStock > 0 ? (
                        <span>In Stock</span>
                      ) : (
                        <span>Unavailable</span>
                      )}
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Reviews</h6>
                      <Rating
                        value={product?.rating}
                        text={`${product?.numReviews} reviews`}
                      ></Rating>
                    </div>
                    {product?.countInStock > 0 ? (
                      <>
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>Quantity</h6>
                          <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product?.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <button
                          onClick={handleAddToCart}
                          className="round-black-btn"
                        >
                          {" "}
                          Add To Cart
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="row my-5">
              <div className="col-md-6">
                <h6 className="mb-3">REVIEWS</h6>
                {product?.reviews?.length === 0 && (
                  <Error variant={"alert-info mt-3"}>No Reviews</Error>
                )}
                {product?.reviews?.map((review, i) => (
                  <div
                    className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                    key={i}
                  >
                    <strong>{review?.name}</strong>
                    <Rating value={review?.rating} text={review?.numReviews} />
                    <span>{moment(review?.createdAt).calendar()}</span>
                    <div className="alert alert-info mt-3">
                      {review?.comment}
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-6">
                <h6>WRITE A CUSTOMER REVIEW</h6>
                <div className="my-4">
                  {reviewLoading && <Loading />}
                  {reviewError && (
                    <Error variant="alert-danger">{reviewError}</Error>
                  )}
                </div>
                {userInfo ? (
                  <form onSubmit={handleSubmit}>
                    <div className="my-4">
                      <strong>Rating</strong>
                      <select
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1...Poor</option>
                        <option value="2">2... Fair</option>
                        <option value="3">3...Good</option>
                        <option value="4">4...Very Good</option>
                        <option value="5">5...Excellent</option>
                      </select>
                    </div>
                    <div className="my-4">
                      <strong>Comment</strong>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        row="3"
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                      ></textarea>
                    </div>
                    <div className="my-3">
                      <button
                        type="submit"
                        className="col-12 round-black-btn border-0 p-3"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="my-3">
                    <Error variant={"alert-warning"}>
                      Please{" "}
                      <Link to="/login">
                        <strong>Login</strong>
                      </Link>{" "}
                      to write a review
                    </Error>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SingleProduct;
