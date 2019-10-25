import React from "react";

export function FormItem(props) {
    let { name, label, type } = props;
    if (type === "text") return (
        <div className="form-row">
            <div className="name">{label}</div>
            <div className="value">
                <input
                    className="input--style-6"
                    type="text"
                    name={name}
                    placeholder={label}
                    value={props.value}
                />
            </div>
        </div>
    );
    else if (type === "number") return (
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
                />
            </div>
        </div>
    );
    else if (type === "textarea") return (
        <div className="form-row">
            <div className="name">{label}</div>
            <div className="value">
                <div className="input-group">
                    <textarea
                        className="textarea--style-6"
                        name={name}
                        placeholder={label}
                        value={props.value}
                    />
                </div>
            </div>
        </div>
    );
    else if (type === "checkbox") return (
        <div className="form-row">
            <div className="name">{label}</div>
            {props.values.map((value, idx) => (
                <div className="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id={props.ids[idx]}
                        value={value}
                    />
                    <label className="custom-control-label" htmlFor={props.ids[idx]}>
                        {props.options[idx]} &nbsp;
                </label>
                </div>
            ))}
        </div>
    )
}
