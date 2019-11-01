import { connect } from "react-redux";
import Detail from "../components/detail";
import { loadDetail, buyItem, likeItem } from "../actions/detail";
import { loadTestimonials } from "../actions/testimonial";

const mapStateToProps = state => ({
  ...state.detailTestimonial
});

const mapDispatchToProps = dispatch => ({
  loadDetail: itemId => {
    dispatch(loadDetail(itemId))
    dispatch(loadTestimonials(itemId))
  },
  buyItem: (itemId, stock) => dispatch(buyItem({ itemId, stock })),
  likeItem: (itemId, vote) => dispatch(likeItem({ itemId, vote }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
