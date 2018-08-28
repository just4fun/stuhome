import { createAction, handleActions } from 'redux-actions';

// *********************************
// Actions
// *********************************

export const FRIENDLIST_FETCH = 'FRIENDLIST_FETCH';
export const FRIENDLIST_INVALIDATE = 'FRIENDLIST_INVALIDATE';

const FRIENDLIST_FETCH_SUCCESS = 'FRIENDLIST_FETCH_SUCCESS';
const FRIENDLIST_FETCH_FAILURE = 'FRIENDLIST_FETCH_FAILURE';

// *********************************
// Action Creators
// *********************************

export const fetchFriendList = createAction(FRIENDLIST_FETCH);
export const invalidateFriendList = createAction(FRIENDLIST_INVALIDATE);

export const fetchFriendListSuccess = createAction(FRIENDLIST_FETCH_SUCCESS);
export const fetchFriendListFailure = createAction(FRIENDLIST_FETCH_FAILURE);

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
  [FRIENDLIST_INVALIDATE]: (state, action) => ({
    ...state,
    didInvalidate: true
  }),
  [FRIENDLIST_FETCH]: (state, action) => {
    let { isEndReached } = action.payload;
    return {
      ...state,
      isRefreshing: !isEndReached,
      isEndReached: isEndReached,
      didInvalidate: false
    };
  },
  [FRIENDLIST_FETCH_SUCCESS]: (state, action) => {
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
  [FRIENDLIST_FETCH_FAILURE]: (state, action) => ({
    ...state,
    isRefreshing: false,
    isEndReached: false,
    didInvalidate: false
  })
}, defaultFriendListState);
