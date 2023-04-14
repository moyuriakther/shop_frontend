import React from "react";

const Rating = ({ value, text }) => {
  // console.log(value, text);
  return (
    <div className="rating">
      <i
        className={
          value >= 1
            ? "fas fa-start"
            : value >= 0.5
            ? "fas fa-start-half-alt"
            : "far fa-start"
        }
      ></i>
      <i
        className={
          value >= 2
            ? "fas fa-start"
            : value >= 1.5
            ? "fas fa-start-half-alt"
            : "far fa-start"
        }
      ></i>
      <i
        className={
          value >= 3
            ? "fas fa-start"
            : value >= 2.5
            ? "fas fa-start-half-alt"
            : "far fa-start"
        }
      ></i>
      <i
        className={
          value >= 4
            ? "fas fa-start"
            : value >= 3.5
            ? "fas fa-start-half-alt"
            : "far fa-start"
        }
      ></i>
      <i
        className={
          value >= 5
            ? "fas fa-start"
            : value >= 4.5
            ? "fas fa-start-half-alt"
            : "far fa-start"
        }
      ></i>
      <span>{text && text}</span>
    </div>
  );
};

export default Rating;
