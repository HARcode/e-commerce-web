import React from "react";
import "../../stylesheets/customStyles.css";

export default function SpecOptions({
  category,
  capacities,
  activeCapacity,
  sizes,
  activeSize,
  onChange
}) {
  let specName, specs, activeSpec;
  if (category === "Smartphone") {
    specName = "Capacity";
    specs = capacities;
    activeSpec = activeCapacity;
  } else {
    specName = "Size";
    specs = sizes;
    activeSpec = activeSize;
  }
  return (
    <div className="my-1 form">
      <h5 className="my-1 ml-3">{specName}</h5>
      <div className="btn-group btn-group-toggle ml-3" data-toggle="buttons">
        {specs.map((spec, index) => (
          <label
            key={index}
            className={`btn mr-2 btn-secondary btn-sm ${
              spec === activeSpec ? "active" : ""
            }`}
            style={{ backgroudColor: "white" }}
          >
            <input
              type="radio"
              name="options"
              checked={spec === activeSpec}
              onChange={() => onChange(spec, category)}
            />
            {spec}
            <i className="fa fa-check text-white"></i>
          </label>
        ))}
      </div>
    </div>
  );
}
