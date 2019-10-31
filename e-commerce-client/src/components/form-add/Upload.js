import React, { Component } from "react";
import Swal from "sweetalert2";
import "../../stylesheets/upload.css";
import "../../stylesheets/style.css";
import Dropzone from "./Dropzone";

// source: https://malcoded.com/posts/react-file-upload/
export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      image: ""
    };
  }

  onFileAdded = file => {
    if (file) {
      if (file.type.match("image.*")) {
        if (file.size <= 3 * Math.pow(10, 6)) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = e => {
            this.setState({
              file,
              image: (
                <span>
                  <img
                    src={e.target.result}
                    title={file.name}
                    style={{
                      height: "10rem",
                      border: "1px solid black",
                      margin: "10px 5px 0 0"
                    }}
                    alt="Uploaded file"
                  />
                </span>
              )
            });
            this.props.onFileChange(file);
          };
        } else {
          Swal.fire({
            title: "Maximum file size exceeded",
            text: "Please upload an image below 3 MB",
            type: "error"
          });
        }
      } else {
        Swal.fire({
          title: "Wrong file type",
          text: "Please upload an image",
          type: "error"
        });
      }
    }
  };

  render() {
    return (
      <div className="row">
        <span className="name">Upload Image</span>
        <div className="value">
          <div className="row">
            <div className="col-auto">
              <Dropzone onFileAdded={this.onFileAdded} disabled={false} />
            </div>
            <div className="col-auto">{this.state.image}</div>
          </div>
        </div>
      </div>
    );
  }
}
