import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { productList } from "../../Redux/Actions/ProductActions";
import Loading from "../loadingError/Loading";
import Error from "../loadingError/Error";

const ShopSection = ({ search, pagenumber }) => {
  const productsList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productsList;
  // console.log(products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productList(search, pagenumber));
  }, [dispatch, search, pagenumber]);
  return (
    <div className="container">
      <div className="section">
        <div className="row">
          <div className="col-lg-12 col-md-12 article">
            <div className="shopcontainer row">
              {loading ? (
                <div className="mb-5">
                  <Loading />
                </div>
              ) : error ? (
                <Error variant="alert-danger">{error}</Error>
              ) : (
                <>
                  {products?.map((product) => (
                    <div
                      className="shop col-lg-4 col-md-6 col-sm-6"
                      key={product?._id}
                    >
                      <div className="border-product">
                        <Link to={`/products/${product?._id}`}>
                          <div className="shopBack">
                            <img src={product?.image} alt={product?.name} />
                          </div>
                        </Link>
                        <div className="shoptext">
                          <p>
                            <Link to={`/products/${product?._id}`}>
                              {product?.name}
                            </Link>
                          </p>
                          <Rating
                            value={product?.rating}
                            text={`${product?.reviews.length} reviews`}
                          ></Rating>
                          <h3>${product?.price}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
              <Pagination
                page={page}
                pages={pages}
                search={search ? search : ""}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSection;
