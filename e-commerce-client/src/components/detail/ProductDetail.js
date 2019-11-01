import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Testimonial from "./Testimonial";

export default function ProductDetail({ detail, testimonials, activeTab }) {
  const [key, setKey] = useState(activeTab);
  return (
    <div className="container-fluid">
      <div className="col-md-12 product-info">
        <Tabs activeKey={key} onSelect={k => setKey(k)}>
          <Tab eventKey="detail" title="Product Detail">
            <div
              className="container mt-3"
              style={{ maxHeight: "25vh", overflowY: "auto" }}
            >
              <div
                role="tabpanel"
                className={`fade tab-pane ${
                  key === "detail" ? " active show" : ""
                }`}
              >
                <ReactMarkdown source={detail} />
              </div>
            </div>
          </Tab>
          <Tab eventKey="testimonials" title="Testimonial">
            <div
              className="container product-info mt-3"
              style={{ maxHeight: "25vh", overflowY: "auto" }}
            >
              <div
                role="tabpanel"
                className={`fade tab-pane ${
                  key === "testimonials" ? " active show" : ""
                }`}
              >
                {testimonials
                  .sort((obj1, obj2) => obj2.rate - obj1.rate)
                  .map((testi, i) => (
                    <Testimonial key={i} {...testi} />
                  ))}
              </div>
            </div>
          </Tab>
        </Tabs>
        <hr />
      </div>
    </div>
  );
}
