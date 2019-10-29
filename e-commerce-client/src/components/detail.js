import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { convertPrice } from "../helpers/convertPrice";
import "../stylesheets/customStyles.css";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = { color: null };
  }

  componentDidMount() {
    this.props.loadDetail(this.props.itemId);
  }

  handleColorChange = color => {
    this.setState({ color });
  };

  render() {
    let { detail } = this.props;
    let colors = detail.colors || [];

    return (
      <div
        className="container"
        style={{
          maxHeight: "95vh",
          overflowY: "auto",
          marginTop: "2.5vh",
          marginBottom: "2.5vh"
        }}
      >
        <h1 className="mb-4">
          Detail
          <small></small>
        </h1>

        <div
          className="row my-3"
          style={{ maxHeight: "55vh", overflowY: "auto" }}
        >
          <div className="col-12 col-sm-5">
            <div className="imageFloat">
              <img
                id="item-display"
                src={detail.filename}
                alt=""
                className="img-thumbnail"
                height="30rem"
                width="auto"
              />
            </div>
          </div>

          <div className="col-12 col-sm-7">
            <h3 className="my-3">
              <b>{detail.title}</b>
              <br />
            </h3>
            <h6 style={{ color: "blue", textAlign: "left" }}>
              {`Brand: ${detail.brand}. (${detail.vote} votes)`}
            </h6>
            <div className="my-2">
              <h4>{convertPrice(detail.price)}</h4>
            </div>
            <br />
            <div className="card" style={{ backgroundColor: "#bfe1e3" }}>
              <h4 className="my-1">Color</h4>
              <div className="btn-group btn-group-toggle my-1" data-toggle="buttons">
                {colors.map((color, index) => (
                  <label
                    key={index}
                    className={`btn mx-1 ${
                      color === this.state.color ? "active" : ""
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    <input
                      type="radio"
                      name="options"
                      id={`color${index}`}
                      checked={color === this.state.color}
                      onChange={() => this.handleColorChange(color)}
                    />
                    <i className="fa fa-check text-white"></i>
                  </label>
                ))}
              </div>
            </div>

            <p className="my-2">{detail.description}</p>
            <h3 className="my-3">Project Details</h3>
            <div className="col-md-4">
              <ul>
                <li>Lorem Ipsum</li>
                <li>Dolor Sit Amet</li>
                <li>Consectetur</li>
                <li>Adipiscing Elit</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="col-md-12 product-info">
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
              <Tab eventKey="home" title="Product Detail">
                <div
                  className="container mt-3"
                  style={{ maxHeight: "25vh", overflowY: "auto" }}
                >
                  <div
                    id="uncontrolled-tab-example-tabpane-home"
                    aria-labelledby="uncontrolled-tab-example-tab-home"
                    role="tabpanel"
                    aria-hidden="false"
                    className="fade tab-pane active show"
                  >
                    <ReactMarkdown source={detail.detail} />
                  </div>
                </div>
              </Tab>
              <Tab eventKey="profile" title="Testimonial">
                <div
                  className="container product-info mt-3"
                  style={{ maxHeight: "25vh", overflowY: "auto" }}
                >
                  <div
                    id="uncontrolled-tab-example-tabpane-profile"
                    aria-labelledby="uncontrolled-tab-example-tab-profile"
                    role="tabpanel"
                    aria-hidden="false"
                    className="fade tab-pane active show"
                  >
                    <p>
                      How can my muse want subject to invent, While thou dost
                      breathe, that pour'st into my verse Thine own sweet
                      argument, too excellent For every vulgar paper to
                      rehearse? O! give thy self the thanks, if aught in me
                      Worthy perusal stand against thy sight; For who's so dumb
                      that cannot write to thee, When thou thy self dost give
                      invention light? Be thou the tenth Muse, ten times more in
                      worth Than those old nine which rhymers invocate;
                    </p>
                  </div>
                </div>
              </Tab>
            </Tabs>

            <hr />
          </div>
        </div>

        {/* <div className="row">
          <div className="col-md-3 col-sm-6 mb-4">
            <a href="/#">
              <img
                className="img-fluid"
                src="http://placehold.it/500x300"
                alt=""
              />
            </a>
          </div>

          <div className="col-md-3 col-sm-6 mb-4">
            <a href="/#">
              <img
                className="img-fluid"
                src="http://placehold.it/500x300"
                alt=""
              />
            </a>
          </div>

          <div className="col-md-3 col-sm-6 mb-4">
            <a href="/#">
              <img
                className="img-fluid"
                src="http://placehold.it/500x300"
                alt=""
              />
            </a>
          </div>

          <div className="col-md-3 col-sm-6 mb-4">
            <a href="/#">
              <img
                className="img-fluid"
                src="http://placehold.it/500x300"
                alt=""
              />
            </a>
          </div>
        </div> */}
      </div>
    );
  }
}

export default Detail;
