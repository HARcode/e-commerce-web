import React from "react";
import { convertPrice } from "../helpers/convertPrice";
import "../stylesheets/customStyles.css";

export default function Item(props) {
  let {
    itemId,
    filename,
    title,
    rate,
    description,
    price,
    testimonials,
    showDetail
  } = props;
  return (
    <div
      className="col-12 col-sm-3 flex-column d-flex card-xs"
      style={{ width: "25%" }}
    >
      <div className="card" style={{ width: "100%", height: "40rem" }}>
        <div
          className="d-flex align-items-center"
          style={{ width: "100%", height: "25rem" }}
        >
          <img src={filename} className="card-img-top my-auto" alt="..." />
        </div>
        <div className="card-body flex-column d-flex sticky-bottom">
          <div className="row justify-content-between">
            <div className="col-12 card-title h4">
              <b>{title}</b>
            </div>
            <div className="d-flex col-auto text-left align-self-center pr-0">
              <span className="stars">
                <span style={{ width: `${rate}rem` }} />
              </span>
            </div>

            <div className="d-flex col-6 text-right align-self-center pl-0">
              <div className="row justify-content-end">
                <div className="col-auto p-0">{rate}</div>
                <div className="col-auto pl-1 pr-0">
                  (<i className="fa fa-user"></i>{" "}
                  {convertPrice(testimonials.length, "")})
                </div>
              </div>
            </div>
            <div
              className="col-12 my-2"
              style={{ maxHeight: "4rem", overflowY: "auto" }}
            >
              {description}
            </div>
            <div className="col-12 h5">{convertPrice(price)}</div>
          </div>
          <button
            className="btn btn-primary mt-auto"
            onClick={() => showDetail(itemId)}
          >
            <i className="fa fa-info-circle mx-2"></i>
            Item detail
          </button>
        </div>
      </div>
    </div>
  );
}
