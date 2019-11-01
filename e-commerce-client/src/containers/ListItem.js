import React from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { loadData } from "../actions/data";
import Item from "./Item";

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colRate: "col-auto pl-0",
      page: 1,
      hasMore: true
    };
  }

  componentDidMount() {
    this.props.loadItems();
    window.addEventListener("resize", this.updateColRate);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateColRate);
  }

  fetchMoreData = () => {
    const { pagination, loadItems } = this.props;
    const { numOfPages } = pagination;
    if (this.state.page >= numOfPages) {
      this.setState({ hasMore: false });
      return;
    }
    this.setState(
      state => ({ page: state.page + 1 }),
      () => {
        loadItems(this.state.page);
      }
    );
  };

  updateColRate = () => {
    let screenWidth = window.innerWidth;
    let newColRate =
      (screenWidth >= 769 && screenWidth <= 1000) || screenWidth < 256
        ? "col-12 ml-3 mt-1"
        : "col-auto pl-0";
    this.setState({ colRate: newColRate });
  };

  render() {
    let { items } = this.props;
    return (
      <div
        className="d-flex justify-content-center container-fluid"
        style={{
          marginTop: "5vh",
          marginBottom: "5vh",
          maxHeight: "90vh",
          alignSelf: "center",
          display: "flex"
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
            id="scrollable"
            className="card-body"
            style={{
              height: "75vh",
              overflowY: "auto"
            }}
          >
            <InfiniteScroll
              dataLength={items.length}
              next={this.fetchMoreData}
              hasMore={this.state.hasMore}
              scrollableTarget="scrollable"
              style={{ overflow: "hide" }}
              scrollThreshold={1}
              loader={
                <div className="d-flex justify-content-center">
                  <div
                    className="spinner-border text-primary"
                    role="status"
                  ></div>
                </div>
              }
              endMessage={
                <div className="row justify-content-center">
                  <hr className="hr hr-primary" />
                </div>
              }
            >
              <div className="row mb-3">
                {items.map((item, i) => (
                  <Item
                    key={item.itemId}
                    {...item}
                    colRate={this.state.colRate}
                  />
                ))}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.data });

const mapDispatchToProps = dispatch => ({
  loadItems: (page = 1) =>
    dispatch(loadData({ headers: { sortBy: "", limit: 4, page } }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem);
