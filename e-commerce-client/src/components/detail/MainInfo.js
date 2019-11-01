import React from "react";
import { convertPrice } from "../../helpers/convertPrice";
import "../../stylesheets/customStyles.css";

export default function MainInfo({
  title,
  brand,
  vote,
  rate,
  numOfRaters,
  price
}) {
  return (
    <>
      <h3 className="my-1">
        <b>{title}</b>
        <br />
      </h3>

      <h6 style={{ color: "blue", textAlign: "left" }}>
        {`Brand: ${brand}. (${vote} votes)`}
      </h6>

      <div className="row justify-content-between mr-1 mt-2">
        <div className="col-auto d-flex text-left align-self-center pr-0">
          <span className="stars">
            <span style={{ width: `${Math.min(rate || 0, 5)}rem` }} />
          </span>
        </div>
        <div className="col-auto d-flex text-right align-self-center pl-0">
          <div className="row justify-content-end">
            <div className="col-auto p-0">{Number(Math.min(rate || 0, 5).toPrecision(3))}</div>
            <div className="col-auto pl-1 pr-0">
              (<i className="fa fa-user"></i> {convertPrice(numOfRaters, "")})
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <h4>{convertPrice(price)}</h4>
      </div>
    </>
  );
}
