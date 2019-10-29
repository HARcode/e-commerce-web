import React, { Component } from "react";
import reactCSS from "reactcss";
// import '../../mockup/style.css'
import { SketchPicker } from "react-color";
import { FormItem } from "../components/form";
import { convertPrice } from "../helpers/convertPrice";
// import { Link } from 'react-router-dom';
import "../stylesheets/style.css";
import Upload from "../components/Upload";

Node.prototype.getParents = function(nth = 0) {
  if (nth <= 0) return this.parentElement;
  return this.getParents.call(this.parentElement, --nth);
};

export default class addItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      price: "",
      rate: "",
      description: "",
      detail: "",
      brand: "",
      colors: ["#000000"],
      red: "",
      blue: "",
      white: "",
      black: "",
      stock: "",
      capacities: [],
      file: {},
      displayColorPicker: [false]
    };
    //
    // this.handleCheckbook = this.handleCheckbook.bind(this)
  }
  handleClickColor = e => {
    let { id } = e.target;
    id = Number(id.split("click")[1]);
    this.setState(state => ({
      displayColorPicker: state.displayColorPicker.map((disp, i) =>
        i === id ? !disp : disp
      )
    }));
    // this.setState({ displayColorPicker: [!this.state.displayColorPicker[0]] });
  };

  handleCloseColor = e => {
    let { id } = e.target;
    id = Number(id.split("close")[1]);
    this.setState(state => ({
      displayColorPicker: state.displayColorPicker.map((disp, i) =>
        i === id ? false : disp
      )
    }));
  };

  handleChangeColor = (color, e) => {
    let target = e.target;
    if (target) {
      let { id } = target.getParents(5);
      id = Number(id.split("color")[1]);
      this.setState(state => ({
        colors: state.colors.map((v, i) => (i === id ? color.hex : v))
      }));
    }
  };

  addColor = e => {
    e.preventDefault();
    this.setState(state => ({
      colors: [...state.colors, "#000000"],
      displayColorPicker: [...state.displayColorPicker, false]
    }));
  };

  delColor = e => {
    e.preventDefault();
    this.setState(state => ({
      colors: state.colors.slice(0, state.colors.length - 1),
      displayColorPicker: state.displayColorPicker.slice(
        0,
        state.displayColorPicker.length - 1
      )
    }));
  };

  handleCheckbook = event => {
    //Checkbox
    const target = event.target;
    if (target.checked) {
      this.setState(state => ({
        capacities: [...state.capacities, target.value]
      }));
    } else {
      this.setState(state => ({
        capacities: state.capacities.filter(
          capacity => capacity !== target.value
        )
      }));
    }
  };

  handleInputChange = e => {
    let { name, value, inputMode } = e.target;
    if (inputMode === "numeric") value = convertPrice(value);
    this.setState({ [name]: value });
  };

  handleFileChange = file => {
    this.setState({ file });
  };

  render() {
    let { colors } = this.state;
    const styles = reactCSS({
      default: {
        colors: colors.map(color => ({
          width: "36px",
          height: "14px",
          borderRadius: "2px",
          background: color
        })),
        swatch: {
          padding: "5px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer"
        },
        popover: {
          position: "absolute",
          zIndex: "2"
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px"
        }
      }
    });

    let {
      title,
      brand,
      price,
      stock,
      detail,
      description,
      capacities
    } = this.state;
    let forms = [
      { name: "title", label: "Title", type: "text", value: title },
      { name: "brand", label: "Brand", type: "text", value: brand },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        rows: 2,
        value: description
      },
      {
        name: "price",
        label: "Price",
        type: "text",
        inputMode: "numeric",
        min: 0,
        value: price
      },
      { name: "stock", label: "Stock", type: "number", min: 0, value: stock },
      "",
      {
        name: "capacity",
        label: "Capacity",
        type: "checkbox",
        values: [16, 32, 64, 128, 256, 512],
        options: [16, 32, 64, 128, 256, 512].map(x => `${x} GB`),
        ids: [16, 32, 64, 128, 256, 512].map(x => `capacity${x}`),
        checked: capacities
      },
      {
        name: "detail",
        label: "Detail Product",
        type: "textarea",
        rows: 10,
        value: detail
      },
      ""
    ];

    let formItems = forms.map((form, i) => {
      if (i === 5)
        return (
          <div key={i} className="form-row row">
            <div className="name">Color</div>
            {colors.map((color, idx) => (
              <div
                key={idx}
                id={`color${idx}`}
                style={{ marginTop: "0.35rem" }}
                className="col-1"
              >
                <div
                  style={styles.swatch}
                  onClick={this.handleClickColor}
                  id={`click${idx}`}
                >
                  <div style={styles.colors[idx]} id={`click${idx}`} />
                </div>
                {this.state.displayColorPicker[idx] && (
                  <div style={styles.popover}>
                    <div
                      style={styles.cover}
                      onClick={this.handleCloseColor}
                      id={`close${idx}`}
                    />
                    <SketchPicker
                      color={color}
                      onChange={this.handleChangeColor}
                      id={`color${idx}`}
                    />
                  </div>
                )}
              </div>
            ))}
            <div style={{ marginTop: "-0.1rem" }}>
              {this.state.colors.length < 8 && (
                <button
                  type="button"
                  className="btn text-info bg-transparent"
                  onClick={this.addColor}
                >
                  <i className="fa fa-plus-circle fa-2x"></i>
                </button>
              )}
              {this.state.colors.length > 1 && (
                <button
                  type="button"
                  className="btn text-danger bg-transparent"
                  onClick={this.delColor}
                >
                  <i className="fa fa-minus-circle fa-2x"></i>
                </button>
              )}
            </div>
          </div>
        ); // color picker
      if (i === 8)
        return (
          <div key={i} className="form-row">
            <Upload onFileChange={this.handleFileChange} />
          </div>
        ); // file
      return (
        <FormItem
          key={i}
          {...form}
          onChange={i === 6 ? this.handleCheckbook : this.handleInputChange}
        />
      );
    });

    return (
      <div className="page-wrapper bg-info p-t-45 p-b-50">
        <div className="wrapper wrapper--w900">
          <div className="card card-6">
            <div className="card-heading">
              <h2 className="btn btn-primary col-lg-12 col-sm-12 col-md-12">
                Add Ads
              </h2>
            </div>
            <div
              className="card-body"
              style={{ maxHeight: "70vh", overflowY: "auto" }}
            >
              <form encType="multipart/form-data" id="add">
                {formItems}
              </form>
            </div>
            <div className="card-footer">
              <button className="btn btn-primary" form="add" type="submit">
                Add
              </button>
              <button className="btn btn-info mx-2" type="submit">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
