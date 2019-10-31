import React from "react";

export default function Quantity({
  stock,
  clicks,
  shown,
  onToggle,
  onIncrement,
  onDecrement
}) {
  return (
    <div className="form">
      <h5 className="mx-3 my-1">Quantity</h5>

      <span className=" mx-4 my-1">
        <button
          className="btn btn-primary btn-sm my-1"
          onClick={onToggle}
        >
          {!shown ? "Show" : "Hide"}
        </button>
      </span>

      <span className="my-1">
        {!shown ? (
          ""
        ) : (
          <span className=" my-1">
            {clicks > 0 && (
              <span className="col-sm-">
                <button
                  onClick={onIncrement}
                  type="button"
                  className="btn btn-danger btn-sm"
                  data-type="minus"
                  data-field="quant[2]"
                >
                  <div className="fa fa-minus" />
                </button>
              </span>
            )}
            <input
              type="text"
              className="col-2"
              style={{ textAlign: "center" }}
              value={clicks}
              readOnly={true}
            />
            {clicks < stock && (
              <span className="col-">
                <button
                  onClick={onDecrement}
                  type="button"
                  className="btn btn-success btn-number btn-sm"
                  data-type="plus"
                  data-field="quant[2]"
                >
                  <div className="fa fa-plus" />
                </button>
              </span>
            )}
            <span className="col-md-2"> stock : </span>
            <span> {stock} </span>
          </span>
        )}
      </span>
    </div>
  );
}
