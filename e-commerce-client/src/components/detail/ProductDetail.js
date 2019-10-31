import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

export default function ProductDetail({ detail, testimonials }) {
  return (
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
                <ReactMarkdown source={detail} />
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
                <p>{testimonials}</p>
              </div>
            </div>
          </Tab>
        </Tabs>
        <hr />
      </div>
    </div>
  );
}
