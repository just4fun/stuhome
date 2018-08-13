import { createAction, handleActions } from 'redux-actions';

// *********************************
// Actions
// *********************************

export const SEARCH_LIST_FETCH = 'SEARCH_LIST_FETCH';
export const SEARCH_LIST_RESET = 'SEARCH_LIST_RESET';

const SEARCH_LIST_FETCH_REQUEST = 'SEARCH_LIST_FETCH_REQUEST';
const SEARCH_LIST_FETCH_SUCCESS = 'SEARCH_LIST_FETCH_SUCCESS';
const SEARCH_LIST_FETCH_FAILURE = 'SEARCH_LIST_FETCH_FAILURE';

// *********************************
// Action Creators
// *********************************

export const fetchSearchList = createAction(SEARCH_LIST_FETCH);
export const resetSearchList = createAction(SEARCH_LIST_RESET);

export const request = createAction(SEARCH_LIST_FETCH_REQUEST);
export const success = createAction(SEARCH_LIST_FETCH_SUCCESS, null, (...args) => args[1]);
export const failure = createAction(SEARCH_LIST_FETCH_FAILURE);

// *********************************
// Reducer
// *********************************

const defaultSearchListState = {
  isRefreshing: false,
  isEndReached: false,
  didInvalidate: false,
  list: [],
  hasMore: false,
  page: 0,
  errCode: ''
};

export default handleActions({
  [SEARCH_LIST_FETCH_REQUEST]: (state, action) => ({
    ...state,
    isRefreshing: !action.payload.isEndReached,
    isEndReached: action.payload.isEndReached,
    didInvalidate: false
  }),
  [SEARCH_LIST_FETCH_SUCCESS]: (state, action) => {
    let {
      payload: topicList
    } = action;

    // If there is no search result, both `page`
    // and `list` will return `undefined`.
    if (topicList.page !== 1 && topicList.list) {
      topicList.list = state.list.concat(topicList.list);
    }

    return {
      ...state,
      isRefreshing: false,
      isEndReached: false,
      didInvalidate: false,
      list: topicList.list || [],
      hasMore: !!topicList.has_next,
      page: topicList.page,
      errCode: topicList.errcode
    };
  },
  [SEARCH_LIST_FETCH_FAILURE]: (state, action) => ({
    ...state,
    isRefreshing: false,
    isEndReached: false,
    didInvalidate: false
  }),
  [SEARCH_LIST_RESET]: () => defaultSearchListState
}, defaultSearchListState);
