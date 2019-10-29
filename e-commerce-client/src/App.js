import React from "react";
import ListItem from "./containers/ListItem";

function App() {
  return (
    <div
      className="container"
      style={{ marginTop: "10vh", marginBottom: "10vh", height: "80vh" }}
    >
      <div className="row my-5 mx-3">
        <a role="button" href="/add" className="btn btn-primary">
          <i className="fa fa-plus mx-2"></i>Add
        </a>
      </div>
      <ListItem />
    </div>
  );
}

export default App;
