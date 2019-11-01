import React, { Component } from "react";
import ItemImage from "./detail/ItemImage";
import MainInfo from "./detail/MainInfo";
import ColorOptions from "./detail/ColorOptions";
import SpecOptions from "./detail/SpecOptions";
import Quantity from "./detail/Quantity";
import BuyButton from "./detail/BuyButton";
import LikeButton from "./detail/LikeButton";
import ProductDetail from "./detail/ProductDetail";
import AddTestimonial from "./detail/AddTestimonial";
import "../stylesheets/customStyles.css";

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: null,
      capacity: null,
      size: null,
      clicks: 0,
      show: false,
      liked: false,
      showModal: false,
      activeTab: "detail",
      showAlert: false
    };
  }

  componentDidMount() {
    this.props.loadDetail(this.props.itemId);
  }

  handleColorChange = color => {
    this.setState({ color });
  };

  handleSpecChange = (spec, category) => {
    if (category === "Smartphone") this.setState({ capacity: spec });
    else this.setState({ size: spec });
  };

  decreaseItem = () => {
    this.setState((state, props) => {
      return {
        clicks: state.clicks + 1
      };
    });
  };

  incrementItem = () => {
    this.setState({ clicks: this.state.clicks - 1 });
  };

  toggleClick = () => {
    this.setState({ show: !this.state.show });
  };

  handleInputChange = event => {
    let clicks = event.target.value;
    this.setState({ clicks });
  };

  handleButtonBuy = e => {
    e.preventDefault();

    let itemId = this.props.detail.itemId;
    let dataClicks = this.state.clicks;
    let dataStock = this.props.detail.stock;
    let spec =
      this.props.detail.category === "Smartphone"
        ? this.state.capacity
        : this.state.size;

    if (dataClicks > 0 && spec && this.state.color) {
      let stock = dataStock - dataClicks;
      if (itemId && stock) {
        this.props.buyItem(itemId, stock);
        this.setState({ showModal: true, showAlert: false });
      }
    } else {
      this.setState({ showAlert: true });
    }
  };

  ButtonLike = e => {
    e.preventDefault();
    let { itemId, vote } = this.props.detail;
    this.setState((state, props) => {
      if (state.liked) vote--;
      else vote++;
      props.likeItem(itemId, vote);
      return { liked: !state.liked };
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      activeTab: "testimonials",
      color: null,
      capacity: null,
      size: null,
      clicks: 0,
      show: false
    });
  };

  render() {
    let { detail, testimonials } = this.props;
    let colors = detail.colors || [];
    let capacities = detail.capacities || [];
    let sizes = detail.sizes || [];
    let { filename, title, brand, vote, rate, price, category, stock } = detail;
    testimonials = testimonials || [];
    let numOfRaters = testimonials.length;

    return (
      <div className="container">
        <div className="card" style={{ height: "100%" }}>
          <div className="card-header" style={{ backgroundColor: "#bfe1e3" }}>
            <h1
              style={{
                WebkitTextFillColor: "white",
                WebkitTextStrokeWidth: "1px",
                WebkitTextStrokeColor: "black"
              }}
            >
              <b>Detail</b>
            </h1>
            {this.state.showAlert && (
              <div className="alert alert-danger" role="alert">
                Please choose{" "}
                <b>{category === "Smartphone" ? "capacity" : "size"}</b>,
                <b> color</b>, and <b>quantity</b>
              </div>
            )}
          </div>
          <div className="card-body">
            <div
              className="row mx-3 d-flex align-items-center"
              style={{ maxHeight: "70vh", overflowY: "auto" }}
            >
              <ItemImage filename={filename} />
              <div className="col-12 col-sm-7">
                <MainInfo
                  {...{ title, brand, vote, rate, numOfRaters, price }}
                />
                <div
                  className="card my-4"
                  style={{ backgroundColor: "#bfe1e3" }}
                >
                  <ColorOptions
                    colors={colors}
                    activeColor={this.state.color}
                    onChange={this.handleColorChange}
                  />
                  <SpecOptions
                    {...{
                      category,
                      capacities,
                      sizes,
                      activeCapacity: this.state.capacity,
                      activeSize: this.state.size,
                      onChange: this.handleSpecChange
                    }}
                  />
                  <Quantity
                    stock={stock}
                    clicks={this.state.clicks}
                    shown={this.state.show}
                    onToggle={this.toggleClick}
                    onIncrement={this.incrementItem}
                    onDecrement={this.decreaseItem}
                  />
                </div>
                <hr />
                <div>
                  <BuyButton onBuy={this.handleButtonBuy} />
                  <br />
                  <LikeButton
                    liked={this.state.liked}
                    onLike={this.ButtonLike}
                  />
                </div>
              </div>
            </div>
            {this.state.showModal && (
              <AddTestimonial
                show={this.state.showModal}
                category={category}
                title={title}
                color={this.state.color}
                capacity={this.state.capacity}
                size={this.state.size}
                itemId={detail.itemId}
                testimonials={testimonials}
                closeModal={this.closeModal}
              />
            )}
            <ProductDetail
              detail={detail.detail}
              testimonials={testimonials}
              activeTab={this.state.activeTab}
            />
          </div>
        </div>
      </div>
    );
  }
}
