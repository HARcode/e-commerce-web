import React, { Component } from "react";
import "../stylesheets/progress.css";

//  source: https://malcoded.com/posts/react-file-upload/
export default class Progress extends Component {
  render() {
    return (
      <div className="ProgressBar">
        <div
          className="Progress"
          style={{ width: this.props.progress + "%" }}
        />
      </div>
    );
  }
}
