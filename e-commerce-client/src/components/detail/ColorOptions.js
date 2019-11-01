import React from "react";

export default function ColorOptions({ colors, activeColor, onChange }) {
  return (
    <>
      <h5 className="ml-3 my-1">Color</h5>
      <div
        className="btn-group btn-group-toggle ml-3"
        data-toggle="buttons"
        style={{width: `${1.1*colors.length}rem`}}
      >
        {colors.map((color, index) => (
          <label
            key={index}
            className={`btn mx-1 btn-sm  ${
              color === activeColor ? "active" : ""
            }`}
            style={{ backgroundColor: color }}
          >
            <input
              type="radio"
              name="options"
              id={`color${index}`}
              checked={color === activeColor}
              onChange={() => onChange(color)}
              className="col-2"
            />
            <i className="fa fa-check text-white"></i>
          </label>
        ))}
      </div>
    </>
  );
}
