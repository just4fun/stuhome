import { HOST, API_PREFIX } from '../../config';
import request from '../../utils/request';
import {
  INVALIDATE_SEARCH,
  REQUEST_SEARCH,
  RECEIVE_SEARCH,
  RESET_SEARCH,
  FAILURE_SEARCH
} from '../../constants/ActionTypes';

const SEARCH_API_PATH = 'forum/search';

function requestSearch(isEndReached) {
  return {
    type: REQUEST_SEARCH,
    isEndReached
  };
}

function receiveSearch(topicList) {
  return {
    type: RECEIVE_SEARCH,
    topicList
  };
}

function failureSearch() {
  return {
    type: FAILURE_SEARCH
  };
}

export function fetchSearch(keyword, isEndReached = false, sortType = 'all', page = 1, pageSize = 20) {
  return dispatch => {
    dispatch(requestSearch(isEndReached));

    let url = HOST +
              API_PREFIX +
              SEARCH_API_PATH +
              `&keyword=${keyword}` +
              `&sortby=${sortType}` +
              `&page=${page}` +
              `&pageSize=${pageSize}`;

    return request({
      url,
      successCallback: data => dispatch(receiveSearch(data)),
      failureCallback: () => dispatch(failureSearch())
    });
  };
}

export function invalidateSearch() {
  return {
    type: INVALIDATE_SEARCH
  };
}

export function resetSearch() {
  return {
    type: RESET_SEARCH
  };
}
