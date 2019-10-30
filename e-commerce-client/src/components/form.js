import React from "react";

export function FormItem(props) {
  let { name, label, type, onChange, inputMode } = props;
  if (type === "text")
    return (
      <div className="form-row">
        <div className="name">{label}</div>
        <div className="value">
          <input
            className="input--style-6"
            type="text"
            name={name}
            placeholder={label}
            value={props.value}
            onChange={onChange}
            inputMode={inputMode || "text"}
            autoComplete="off"
          />
        </div>
      </div>
    );
  else if (type === "number")
    return (
      <div className="form-row">
        <div className="name">{label}</div>
        <div className="value">
          <input
            className="input--style-6"
            type="number"
            name={name}
            placeholder={label}
            value={props.value}
            min={props.min}
            required={true}
            onChange={onChange}
          />
        </div>
      </div>
    );
  else if (type === "textarea")
    return (
      <div className="form-row">
        <div className="name">{label}</div>
        <div className="value">
          <div className="input-group">
            <textarea
              className="form-control"
              name={name}
              placeholder={label}
              value={props.value}
              required={true}
              onChange={onChange}
              rows={props.rows}
            />
          </div>
        </div>
      </div>
    );
  else if (type === "checkbox")
    return (
      <div className="form-row">
        <div className="name">{label}</div>
        {props.values.map((value, idx) => (
          <div key={idx} className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id={props.ids[idx]}
              value={value}
              checked={props.checked.includes(value.toString())}
              onChange={e => onChange(e, name)}
            />
            <label className="custom-control-label" htmlFor={props.ids[idx]}>
              {props.options[idx]} &nbsp;
            </label>
          </div>
        ))}
      </div>
    );
  else if (type === "radio")
    return (
      <div className="form-row">
        <div className="name">{label}</div>
        <div className="btn-group btn-group-toggle my-1" data-toggle="buttons">
          {props.values.map(value => (
            <label
              key={value}
              className={`btn btn-secondary text-white mx-1 ${
                value === props.active ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="options"
                checked={value === props.active}
                onChange={e => onChange(e, name, value)}
              />
              {value} &nbsp;
              <i className="fa fa-check"></i>
            </label>
          ))}
        </div>
      </div>
    );
  return <></>;
}
