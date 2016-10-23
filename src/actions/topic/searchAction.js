import { API_ROOT } from '../../config';
import { fetchWithToken } from '../../utils/request';
import {
  INVALIDATE_SEARCH,
  REQUEST_SEARCH,
  RECEIVE_SEARCH,
  RESET_SEARCH
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

export function fetchSearch(keyword, isEndReached = false, sortType = 'all', page = 1, pageSize = 20) {
  return dispatch => {
    dispatch(requestSearch(isEndReached));

    let requestUrl = API_ROOT +
                     SEARCH_API_PATH +
                     `&keyword=${keyword}` +
                     `&sortby=${sortType}` +
                     `&page=${page}` +
                     `&pageSize=${pageSize}`;

    return fetchWithToken(requestUrl, null, dispatch, receiveSearch);
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
