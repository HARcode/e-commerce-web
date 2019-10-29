import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'
import data from "./data";
import detailTestimonial from "./detail-testimonial";

export default history => combineReducers({
  router: connectRouter(history),
  data,
  detailTestimonial
});
