import React, { Component } from "react";
import "../stylesheets/dropzone.css";

// adapted from: https://malcoded.com/posts/react-dropzone/
export default class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = { highlight: false };
    this.fileInputRef = React.createRef();
  }

  openFileDialog = () => {
    if (this.props.disabled) return;
    this.fileInputRef.current.click();
  };

  onFileAdded = e => {
    if (this.props.disabled) return;
    const file = e.target.files;
    console.log(file);
    
    if (this.props.onFileAdded) this.props.onFileAdded(file[0]);
  };

  onDragOver = e => {
    e.preventDefault();
    if (this.props.disabled) return;
    this.setState({ hightlight: true });
  };

  onDragLeave = () => {
    this.setState({ hightlight: false });
  };

  onDrop = e => {
    e.preventDefault();
    if (this.props.disabled) return;
    const file = e.dataTransfer.files;
    console.log(file);
    
    if (this.props.onFileAdded) this.props.onFileAdded(file[0]);
    this.setState({ hightlight: false });
  };

  render() {
    return (
      <div
        className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: this.props.disabled ? "default" : "pointer" }}
      >
        <input
          ref={this.fileInputRef}
          className="FileInput"
          type="file"
          onChange={this.onFileAdded}
        />
        <img
          alt="upload"
          className="Icon"
          src="iconmonstr-cloud-upload-thin.svg"
          width="5rem"
          height="auto"
        />
        <span>Upload Image</span>
      </div>
    );
  }
}
