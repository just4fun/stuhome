import { createAction, handleActions } from 'redux-actions';

// *********************************
// Actions
// *********************************

export const FRIEND_LIST_FETCH = 'FRIEND_LIST_FETCH';
export const FRIEND_LIST_INVALIDATE = 'FRIEND_LIST_INVALIDATE';

const FRIEND_LIST_FETCH_REQUEST = 'FRIEND_LIST_FETCH_REQUEST';
const FRIEND_LIST_FETCH_SUCCESS = 'FRIEND_LIST_FETCH_SUCCESS';
const FRIEND_LIST_FETCH_FAILURE = 'FRIEND_LIST_FETCH_FAILURE';

// *********************************
// Action Creators
// *********************************

export const fetchFriendList = createAction(FRIEND_LIST_FETCH);
export const invalidateFriendList = createAction(FRIEND_LIST_INVALIDATE);

export const request = createAction(FRIEND_LIST_FETCH_REQUEST);
export const success = createAction(FRIEND_LIST_FETCH_SUCCESS, null, (...args) => args[1]);
export const failure = createAction(FRIEND_LIST_FETCH_FAILURE);

// *********************************
// Reducer
// *********************************

const defaultFriendListState = {
  isRefreshing: false,
  isEndReached: false,
  didInvalidate: false,
  list: [],
  hasMore: false,
  page: 0,
  errCode: ''
};

export default handleActions({
  [FRIEND_LIST_INVALIDATE]: (state, action) => ({
    ...state,
    didInvalidate: true
  }),
  [FRIEND_LIST_FETCH_REQUEST]: (state, action) => {
    let { isEndReached } = action.payload;
    return {
      ...state,
      isRefreshing: !isEndReached,
      isEndReached: isEndReached,
      didInvalidate: false
    };
  },
  [FRIEND_LIST_FETCH_SUCCESS]: (state, action) => {
    let {
      payload: friendList
    } = action;

    if (friendList.page !== 1 && friendList.list) {
      friendList.list = state.list.concat(friendList.list);
    }

    return {
      ...state,
      isRefreshing: false,
      isEndReached: false,
      didInvalidate: false,
      list: friendList.list || [],
      hasMore: !!friendList.has_next,
      page: friendList.page,
      errCode: friendList.errcode
    };
  },
  [FRIEND_LIST_FETCH_FAILURE]: (state, action) => ({
    ...state,
    isRefreshing: false,
    isEndReached: false,
    didInvalidate: false
  })
}, defaultFriendListState);
