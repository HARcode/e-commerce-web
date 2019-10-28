import React from "react";
import { connect } from "react-redux";
import { loadData } from "../actions/data";
import Item from "./Item";

class ListItem extends React.Component {
  componentDidMount() {
    this.props.loadItems();
  }

  render() {
    let { items } = this.props;
    let rates = [4.3, 4.7]
    return (
      <div className="card-deck mb-3">
        {items.map((item, i) => <Item key={item.itemId} {...item} rate={rates[i]} />)}
      </div>
    );
  }
}

const mapStateToProps = state => ({ items: state.data.items });

const mapDispatchToProps = dispatch => ({
  loadItems: () => dispatch(loadData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem);
