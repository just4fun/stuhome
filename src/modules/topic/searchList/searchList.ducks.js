import { createAction, handleActions } from 'redux-actions';

// *********************************
// Actions
// *********************************

export const SEARCHLIST_FETCH = 'SEARCHLIST_FETCH';
export const SEARCHLIST_RESET = 'SEARCHLIST_RESET';

const SEARCHLIST_FETCH_SUCCESS = 'SEARCHLIST_FETCH_SUCCESS';
const SEARCHLIST_FETCH_FAILURE = 'SEARCHLIST_FETCH_FAILURE';

// *********************************
// Action Creators
// *********************************

export const fetchSearchList = createAction(SEARCHLIST_FETCH);
export const resetSearchList = createAction(SEARCHLIST_RESET);

export const fetchSearchListSuccess = createAction(SEARCHLIST_FETCH_SUCCESS);
export const fetchSearchListFailure = createAction(SEARCHLIST_FETCH_FAILURE);

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
  [SEARCHLIST_FETCH]: (state, action) => ({
    ...state,
    isRefreshing: !action.payload.isEndReached,
    isEndReached: action.payload.isEndReached,
    didInvalidate: false
  }),
  [SEARCHLIST_FETCH_SUCCESS]: (state, action) => {
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
  [SEARCHLIST_FETCH_FAILURE]: (state, action) => ({
    ...state,
    isRefreshing: false,
    isEndReached: false,
    didInvalidate: false
  }),
  [SEARCHLIST_RESET]: () => defaultSearchListState
}, defaultSearchListState);
