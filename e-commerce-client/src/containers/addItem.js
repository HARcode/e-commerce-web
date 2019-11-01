import React, { Component } from "react";
import reactCSS from "reactcss";
import { connect } from "react-redux";
import { SketchPicker } from "react-color";
import { addData } from "../actions/data";
import { FormItem } from "../components/form-add/form";
import { convertPrice } from "../helpers/convertPrice";
import "../stylesheets/style.css";
import Upload from "../components/form-add/Upload";

Node.prototype.getParents = function(nth = 0) {
  if (nth <= 0) return this.parentElement;
  return this.getParents.call(this.parentElement, --nth);
};

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      title: "",
      price: "",
      description: "",
      detail: "",
      brand: "",
      colors: ["#000000"],
      stock: "",
      capacities: [],
      sizes: [],
      file: {},
      displayColorPicker: [false]
    };
  }

  handleClickColor = e => {
    let { id } = e.target;
    id = Number(id.split("click")[1]);
    this.setState(state => ({
      displayColorPicker: state.displayColorPicker.map((disp, i) =>
        i === id ? !disp : disp
      )
    }));
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

  handleCheckbox = (event, name) => {
    const target = event.target;
    if (target.checked) {
      this.setState(state => ({
        [name]: [...state[name], target.value]
      }));
    } else {
      this.setState(state => ({
        [name]: state[name].filter(val => val !== target.value)
      }));
    }
  };

  handleRadio = (event, name, value) => {
    if (event.target.checked) {
      let newState;
      if (value === "Smartphone")
        newState = { capacities: [], sizes: undefined };
      else if (value === "Fashion")
        newState = { capacities: undefined, sizes: [] };
      this.setState({ [name]: value, ...newState });
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

  selectOnChange = type => {
    switch (type) {
      case "checkbox":
        return this.handleCheckbox;
      case "radio":
        return this.handleRadio;
      default:
        return this.handleInputChange;
    }
  };

  selectSpecification = category => {
    switch (category) {
      case "Smartphone":
        return {
          name: "capacities",
          label: "Capacity",
          type: "checkbox",
          values: [16, 32, 64, 128, 256, 512],
          options: [16, 32, 64, 128, 256, 512].map(x => `${x} GB`),
          ids: [16, 32, 64, 128, 256, 512].map(x => `capacity${x}`),
          checked: this.state.capacities
        };
      case "Fashion":
        return {
          name: "sizes",
          label: "Sizes",
          type: "checkbox",
          values: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
          options: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
          ids: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map(x => `sizes${x}`),
          checked: this.state.sizes
        };
      default:
        return {};
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addData({
      ...this.state,
      price: Number(this.state.price.replace(/\D/g, "")),
      displayColorPicker: undefined
    });
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
      category,
      title,
      brand,
      price,
      stock,
      detail,
      description
    } = this.state;

    let forms = [
      {
        name: "category",
        label: "Category",
        type: "radio",
        active: category,
        values: ["Smartphone", "Fashion"]
      },
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
      { type: "color" },
      this.selectSpecification(category),
      {
        name: "detail",
        label: "Detail Product",
        type: "textarea",
        rows: 10,
        value: detail
      },
      { type: "file" }
    ];

    let formItems = forms.map((form, i) => {
      if (form.type === "color")
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
              {colors.length < 8 && (
                <button
                  type="button"
                  className="btn text-info bg-transparent"
                  onClick={this.addColor}
                >
                  <i className="fa fa-plus-circle fa-2x"></i>
                </button>
              )}
              {colors.length > 1 && (
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
      if (form.type === "file")
        return (
          <div key={i} className="form-row">
            <Upload onFileChange={this.handleFileChange} />
          </div>
        ); // file
      return (
        <FormItem key={i} {...form} onChange={this.selectOnChange(form.type)} />
      );
    });

    return (
      <div className="container-fluid bg-info p-t-45 p-b-50">
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
              <form
                encType="multipart/form-data"
                id="add"
                onSubmit={this.handleSubmit}
              >
                {formItems}
              </form>
            </div>
            <div className="card-footer">
              <button className="btn btn-primary" form="add" type="submit">
                Add
              </button>
              <button className="btn btn-info mx-2" type="button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addData: item => dispatch(addData(item))
});

export default connect(
  null,
  mapDispatchToProps
)(AddItem);
