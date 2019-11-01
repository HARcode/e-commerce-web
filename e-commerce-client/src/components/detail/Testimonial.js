import React from "react";
import Rater from "react-rater";
import "../../stylesheets/react-rater.css";

export default function Testimonial({ rate, name, text }) {
  return (
    <div className="row justify-content-between my-3">
      <div className="col-12 col-sm-6 d-flex align-items-center text-left">
        <b>{name}</b>
      </div>
      <div className="col-12 col-sm-6 d-flex align-items-center justify-content-end">
        <Rater rating={rate} interactive={false} /> {rate}
      </div>
      <div className="col-12">
        {text}
      </div>
    </div>
  );
}
