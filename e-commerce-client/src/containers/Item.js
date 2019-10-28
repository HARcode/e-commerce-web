import { connect } from "react-redux";
import Item from "../components/Item";
import { loadDetail } from "../actions/detail";

const mapDispatchToProps = dispatch => ({
  showDetail: itemId => dispatch(loadDetail(itemId))
});

export default connect(
  null,
  mapDispatchToProps
)(Item);
