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
        className="container"
        style={{
          marginTop: "10vh",
          marginBottom: "10vh",
          height: "80vh",
          overflowY: "auto"
        }}
      >
        <div className="card">
          <div className="card-header">
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
          <div className="card-body">
            <div className="card-deck mb-3">
              {items.map(item => (
                <Item key={item.itemId} {...item} />
              ))}
            </div>
            <Pagination {...pagination} numOfPages={100} sortBy={JSON.stringify(sortBy)} />
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
