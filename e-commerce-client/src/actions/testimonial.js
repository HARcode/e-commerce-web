import { request } from "../helpers/accessAPI";
import { mean } from "../helpers/mean";
import {
  LOAD_TESTIMONIALS,
  ADD_TESTIMONIALS,
  ADD_TESTIMONIALS_SUCCESS,
  ADD_TESTIMONIALS_FAILURE
} from "../constants/actionTypes";

// LOAD
const loadTestimonialsRedux = testimonials => ({
  type: LOAD_TESTIMONIALS,
  testimonials
});

export const loadTestimonials = (itemId = 0) => {
  return (dispatch, getState) => {
    let { items } = getState();
    let itemLoaded = [...items].filter(item => item.itemId === itemId);
    let testimonials = itemLoaded[0] ? itemLoaded[0].testimonials : [];
    dispatch(loadTestimonialsRedux(testimonials));
  };
};

// ADD
const addTestimonialsRedux = ({ itemId, rate, testimonials }) => ({
  type: ADD_TESTIMONIALS,
  itemId,
  rate,
  testimonials
});

const addTestimonialSuccess = ({ itemId, rate, testimonials }) => ({
  type: ADD_TESTIMONIALS_SUCCESS,
  itemId,
  rate,
  testimonials
});

const addTestimonialFailure = ({ itemId, rate, testimonials }) => ({
  type: ADD_TESTIMONIALS_FAILURE,
  itemId,
  rate,
  testimonials
});

export const addTestimonial = (
  rated = { itemId: 0, testimonial: { rate: 5, name: "", text: "" } }
) => {
  let { itemId, testimonial } = rated;
  return (dispatch, getState) => {
    let { items } = getState();
    let itemRated = [...items].filter(item => item.itemId === itemId);
    let testimonials = itemRated[0] ? itemRated[0].testimonials : [];
    testimonials = [...testimonials, testimonial];
    let rates = [...testimonials].map(testi => testi.rate);
    let rate = mean(rates);
    dispatch(addTestimonialsRedux({ itemId, rate, testimonials }));
    return request
      .put(itemId, {
        rate,
        testimonials: JSON.stringify(testimonials)
      })
      .then(result => {
        let response = result.data;
        if (response.error)
          dispatch(addTestimonialFailure({ itemId, rate, testimonials }));
        else dispatch(addTestimonialSuccess({ itemId, rate, testimonials }));
      })
      .catch(() =>
        dispatch(addTestimonialFailure({ itemId, rate, testimonials }))
      );
  };
};
