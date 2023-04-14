import React from "react";
import { Link } from "react-router-dom";

const Pagination = () => {
  return (
    <nav className="pagination-nav">
      <ul className="flex justify-content-center pagination">
        <li className={`page-item active`}>
          <Link className="page-link" to={"/page/1"}>
            1
          </Link>
        </li>
        <li className={`page-item`}>
          <Link className="page-link" to={"/page/2"}>
            2
          </Link>
        </li>
        <li className={`page-item`}>
          <Link className="page-link" to={"/page/3"}>
            3
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
