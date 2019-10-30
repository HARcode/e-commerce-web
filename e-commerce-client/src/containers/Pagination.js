import { connect } from "react-redux";
import { loadData } from "../actions/data";
import Pagination from "../components/Pagination";

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadData: page =>
    dispatch(
      loadData({
        headers: { sortBy: ownProps.sortBy, limit: ownProps.limit, page }
      })
    )
});

export default connect(
  null,
  mapDispatchToProps
)(Pagination);
