import { request } from "../helpers/accessAPI";
import {
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAILURE,
  FILTER_DATA_SUCCESS,
  FILTER_DATA_FAILURE,
  ADD_DATA_FAILURE
} from "../constants/actionTypes";
import { loadDetailRedux } from "./detail";

const defaultSortBy = [
  { field: "rate", asc: false },
  { field: "price", asc: true },
  { field: "vote", asc: false }
];

// START LOAD DATA
const loadDataSuccess = (items, { numOfPages, limit, page }, sortBy) => ({
  type: LOAD_DATA_SUCCESS,
  items,
  pagination: { numOfPages, limit, page },
  sortBy
});

const loadDataFailure = () => ({ type: LOAD_DATA_FAILURE });

export const loadData = (
  config = { headers: { sortBy: "", limit: 4, page: 1 } }
) => {
  let { sortBy, limit, page } = config.headers;
  sortBy = JSON.parse(sortBy || JSON.stringify(defaultSortBy));
  return dispatch => {
    return request
      .get("", config)
      .then(result => {
        let response = result.data;
        let { error, numOfPages, items } = response;
        if (error) dispatch(loadDataFailure());
        else
          dispatch(loadDataSuccess(items, { limit, page, numOfPages }, sortBy));
      })
      .catch(() => dispatch(loadDataFailure()));
  };
};
// END LOAD DATA

// START FILTER DATA
const filterDataSuccess = (items, { numOfPages, limit, page }, sortBy) => ({
  type: FILTER_DATA_SUCCESS,
  items,
  pagination: { numOfPages, limit, page },
  sortBy
});

const filterDataFailure = () => ({ type: FILTER_DATA_FAILURE });

export const filterData = (
  filter = {},
  config = { sortBy: "", limit: 4, page: 1 }
) => {
  let { sortBy, limit, page } = config;
  sortBy = JSON.parse(sortBy || JSON.stringify(defaultSortBy));
  return dispatch => {
    return request
      .post("filter", { ...filter, ...config })
      .then(result => {
        let response = result.data;
        let { error, numOfPages, items } = response;
        if (error) dispatch(filterDataFailure());
        else
          dispatch(
            filterDataSuccess(items, { limit, page, numOfPages }, sortBy)
          );
      })
      .catch(() => dispatch(filterDataFailure()));
  };
};
// END FILTER DATA

// START ADD DATA
const addDataFailure = itemId => ({ type: ADD_DATA_FAILURE, itemId });

export const addData = (item = {}) => {
  let { colors, capacities } = item;
  let itemId = Date.now();
  // Assign itemId as property of 'item'
  item = {
    itemId,
    ...item
  };
  return dispatch => {
    dispatch(loadDetailRedux(item));
    /* if colors and/or capacities are arrays, then convert them to string, such that
    we can pass 'item' as 'body' to post method request. */
    const itemSent = {
      ...item,
      ...(colors instanceof Array && { colors: JSON.stringify(colors) }),
      ...(capacities instanceof Array && {
        capacities: JSON.stringify(capacities)
      })
    };
    return request
      .post("", itemSent)
      .then(result => {
        let response = result.data;
        let { error, itemAdded } = response;
        if (error) dispatch(addDataFailure(itemId));
        else dispatch(loadDetailRedux(itemAdded));
      })
      .catch(() => dispatch(addDataFailure(itemId)));
  };
};
// END ADD DATA
