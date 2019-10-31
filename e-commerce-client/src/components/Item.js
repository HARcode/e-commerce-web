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
      className="col-12 col-sm-6 col-md-3 mt-2 flex-column d-flex card-xs"
      // style={{ marginLeft: "-1rem", marginRight: "-1rem" }}
    >
      <div className="card" style={{ height: "40rem" }}>
        <div className="d-flex align-items-center img-wrap">
          <img src={filename} className="card-img-top my-auto" alt="..." />
        </div>
        <div className="card-body flex-column d-flex sticky-bottom">
          <div className="row justify-content-between">
            <div className="col-12 card-title h6">
              <b>{title}</b>
            </div>
            <div className="d-flex col-auto text-left align-self-center pr-0">
              <span className="stars">
                <span style={{ width: `${Math.min(rate, 5)}rem` }} />
              </span>
            </div>

            <div className="d-flex col-auto text-right align-self-center pl-0">
              <div className="row justify-content-end">
                <div className="col-auto p-0">{Math.min(rate, 5)}</div>
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
