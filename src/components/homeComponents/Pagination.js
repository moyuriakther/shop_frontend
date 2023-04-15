import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ page, pages, search = "" }) => {
  return (
    pages > 1 && (
      <nav className="pagination-nav">
        <ul className="flex justify-content-center pagination">
          {[...Array(pages).keys()].map((x) => (
            <li
              key={x + 1}
              className={`page-item ${x + 1 === page ? "active" : ""}`}
            >
              <Link
                className="page-link"
                to={
                  search ? `/search/${search}/page/${x + 1}` : `/page/${x + 1}`
                }
              >
                {x + 1}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default Pagination;
