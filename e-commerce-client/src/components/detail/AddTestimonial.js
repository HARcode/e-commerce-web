import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Rater from "react-rater";
import "../../stylesheets/react-rater.css";
import { addTestimonial } from "../../actions/testimonial";

class AddTestimonial extends Component {
  constructor(props) {
    super(props);
    this.state = { rate: null, name: "", text: "", isValid: true };
  }

  handleRatingClick = ({ rating }) => {
    this.setState({ rate: rating });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSend = e => {
    e.preventDefault();
    let { rate, name, text } = this.state;
    if (!rate || !name || !text) this.setState({ isValid: false });
    else {
      this.setState({ isValid: true });
      this.props.sendTestimonial({ rate, name, text });
      this.props.closeModal();
    }
  };

  handleKeyUp = e => {
    if (e.keyCode === 13 && !e.shiftKey) {
      this.handleSend(e);
    }
  }

  render() {
    let { category, title, color, capacity, size, show } = this.props;
    let spec = category === "Smartphone" ? capacity : size;
    return (
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            <h3>Buy {title} success</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="addTestimonial" onSubmit={this.handleSend}>
            <div className="row justify-content-between">
              {!this.state.isValid && (
                <div className="col-12">
                  <div className="alert alert-danger" role="alert">
                    Please fill the input fields
                  </div>
                </div>
              )}
              <div className="col-12 col-sm-6 d-flex align-items-center">
                <span
                  className="btn mr-2"
                  style={{
                    backgroundColor: color,
                    border: "1px solid black",
                    display: "inline"
                  }}
                />
                {spec}
              </div>
              <div className="col-12 col-sm-6 d-flex align-items-center">
                <Rater
                  onRate={this.handleRatingClick}
                  rating={this.state.rate || 0}
                />
              </div>
              <div className="col-12 my-1">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Your name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  onKeyUp={this.handleKeyUp}
                />
              </div>
              <div className="col-12 my-1">
                <textarea
                  className="form-control"
                  placeholder={`Your testimonial / comment for ${title} ...`}
                  name="text"
                  value={this.state.text}
                  onChange={this.handleInputChange}
                  onKeyUp={this.handleKeyUp}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            form="addTestimonial"
            className="btn btn-primary"
          >
            Send
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  sendTestimonial: (testimonial = { rate: 5, name: "", text: "" }) => {
    dispatch(
      addTestimonial({
        itemId: ownProps.itemId,
        testimonials: [...ownProps.testimonials, testimonial]
      })
    );
  }
});

export default connect(
  null,
  mapDispatchToProps
)(AddTestimonial);
