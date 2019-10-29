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
    return (
      <div className="card-deck mb-3">
        {items.map(item => (
          <Item key={item.itemId} {...item} />
        ))}
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
