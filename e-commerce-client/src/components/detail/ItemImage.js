import React from "react";

export default function({ filename }) {
  return (
    <div className="col-12 col-sm-5">
      <div className="imageFloat">
        <img
          id="item-display"
          src={filename}
          alt=""
          className="img-thumbnail"
          height="2rem"
          width="auto"
        />
      </div>
    </div>
  );
}
