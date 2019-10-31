import { connect } from "react-redux";
import Detail from "../components/detail";
import { loadDetail, buyItem } from "../actions/detail";

const mapStateToProps = state => ({
  ...state.detailTestimonial
});

const mapDispatchToProps = dispatch => ({
  loadDetail: itemId => dispatch(loadDetail(itemId)),
  buyItem: (itemId, stock) => dispatch(buyItem({ itemId: itemId, stock: stock }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
