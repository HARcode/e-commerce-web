import React from "react";

export default function BuyButton({ onBuy }) {
  return (
    <button type="button" className="btn btn-block btn-success" onClick={onBuy}>
      <div className="fa fa-cart-arrow-down fa-lg mx-2" aria-hidden="true" />
      <b>Buy</b>
    </button>
  );
}
