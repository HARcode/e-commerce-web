import React, { Component } from "react";
import reactCSS from "reactcss";
// import '../../mockup/style.css'
import { SketchPicker } from "react-color";
import { FormItem } from "../components/form";
import { convertPrice } from "../helpers/convertPrice";
// import { Link } from 'react-router-dom';
import '../stylesheets/style.css'

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
      GB16: "",
      GB32: "",
      GB64: "",
      GB128: "",
      filename: "",
      added: false,
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
    e.persist();
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
    if (this.state.colors.length === 7) e.target.style.display = "none";
    else
      this.setState(state => ({
        colors: [...state.colors, "#000000"],
        displayColorPicker: [...state.displayColorPicker, false]
      }));
  };

  handleCheckbook(event) {
    //Checkbox
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleInputChange = e => {
    let { name, value, inputMode } = e.target;
    if (inputMode === "numeric") value = convertPrice(value);
    this.setState({ [name]: value });
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

    let { title, brand, price, stock, detail, description } = this.state;
    let forms = [
      { name: "title", label: "Title", type: "text", value: title },
      { name: "brand", label: "Brand", type: "text", value: brand },
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
        values: [16, 32, 64, 128],
        options: [16, 32, 64, 128].map(x => `${x} GB`),
        ids: [16, 32, 64, 128].map(x => `capacity${x}`)
      },
      {
        name: "detail",
        label: "Detail Product",
        type: "textarea",
        value: detail
      },
      "",
      {
        name: "description",
        label: "Description",
        type: "textarea",
        value: description
      }
    ];

    let formItems = forms.map((form, i) => {
      if (i === 4)
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
            <div style={{ marginTop: "0.15rem" }}>
              <button
                type="button"
                className="btn text-info bg-transparent"
                onClick={this.addColor}
              >
                <i className="fa fa-plus-circle fa-2x" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        ); // color picker
      if (i === 7)
        return (
          <div key={i} className="form-row">
            <div className="name">Choose Image</div>
            <div className="value">
              <div className="input-group js-input-file">
                <input
                  className="input-file"
                  type="file"
                  name="filename"
                  id="file"
                />
                <label className="label--file" htmlFor="file">
                  Choose file
                </label>
                <span className="input-file__info">No file chosen</span>
              </div>
              <div className="label--desc">
                Upload your image or any other relevant file. Max file size 50
                MB
              </div>
            </div>
          </div>
        ); // file
      return <FormItem key={i} {...form} onChange={this.handleInputChange} />;
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
              <form method="POST" id="add">
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
              {/* <Link to="/detail" className="btn btn-info mx-2" >
                Detail
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
