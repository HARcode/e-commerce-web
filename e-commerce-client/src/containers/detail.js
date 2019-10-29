import { connect } from "react-redux";
import Detail from "../components/detail";
import { loadDetail } from "../actions/detail";

const mapStateToProps = state => ({
  ...state.detailTestimonial
});

const mapDispatchToProps = dispatch => ({
  loadDetail: itemId => dispatch(loadDetail(itemId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
