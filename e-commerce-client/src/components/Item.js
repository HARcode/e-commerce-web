import React from "react";
import { convertPrice } from "../helpers/convertPrice";
import "../stylesheets/star.css";

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
      className="col-12 col-sm-3 flex-column d-flex"
      style={{ width: "25%" }}
    >
      <div className="card card-xs" style={{ width: "100%", height: "40rem" }}>
        <div
          className="d-flex align-items-center"
          style={{ width: "100%", height: "20rem" }}
        >
          <img src={filename} className="card-img-top my-auto" alt="..." />
        </div>
        <div className="card-body flex-column d-flex sticky-bottom">
          <div className="row justify-content-between">
            <div className="col-12 card-title h4">
              <b>{title}</b>
            </div>
            <div className="col-6 text-left">
              <span className="stars">
                <span style={{ width: `${1.2 * rate}rem` }} />
              </span>
            </div>
            <div className="col-6 text-right">
              (<i className="fa fa-user"></i> {testimonials.length})
            </div>
            <div
              className="col-12"
              style={{ maxHeight: "5rem", overflowY: "auto" }}
            >
              {description}
            </div>
            <div className="col-12 h5">{convertPrice(price)}</div>
          </div>
          <button
            className="btn btn-primary mt-auto"
            // style={{ alignSelf: "right" }}
            onClick={() => showDetail(itemId)}
          >
            Item detail
          </button>
        </div>
      </div>
    </div>
  );
}
