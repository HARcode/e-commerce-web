import React from "react";
import { connect } from "react-redux";
import { loadData } from "../actions/data";
import Item from "./Item";
import Pagination from "./Pagination";

class ListItem extends React.Component {
  componentDidMount() {
    this.props.loadItems();
  }

  render() {
    let { items, pagination, sortBy } = this.props;
    return (
      <div
        className="d-flex justify-content-center"
        style={{
          marginTop: "5vh",
          marginBottom: "5vh",
          maxHeight: "90vh"
        }}
      >
        <div className="card card-responsive-width">
          <div className="card-header bg-info text-light">
            <div className="row justify-content-between mx-2">
              <h3>
                <b>Welcome to HARcode E-Commerce</b>
              </h3>
              <div className="col-auto">
                <a role="button" href="/add" className="btn btn-primary">
                  <i className="fa fa-plus mx-2"></i>Add item ads
                </a>
              </div>
            </div>
          </div>
          <div
            className="card-body"
            style={{
              maxHeight: "80vh",
              overflowY: "auto"
            }}
          >
            <Pagination {...pagination} sortBy={JSON.stringify(sortBy)} />
            <div className="row mb-3 justify-content-between">
              {items.map((item, i) => (
                <Item key={item.itemId} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.data });

const mapDispatchToProps = dispatch => ({
  loadItems: () => dispatch(loadData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem);
