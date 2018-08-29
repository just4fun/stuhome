import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';
import { LOGOUT } from '~/modules/user/session/session.ducks';

// *********************************
// Actions
// *********************************

export const USERTOPICLIST_FETCH = 'USERTOPICLIST_FETCH';
export const USERTOPICLIST_INVALIDATE = 'USERTOPICLIST_INVALIDATE';

const USERTOPICLIST_FETCH_REQUEST = 'USERTOPICLIST_FETCH_REQUEST';
const USERTOPICLIST_FETCH_SUCCESS = 'USERTOPICLIST_FETCH_SUCCESS';
const USERTOPICLIST_FETCH_FAILURE = 'USERTOPICLIST_FETCH_FAILURE';

// *********************************
// Action Creators
// *********************************

export const fetchUserTopicList = createAction(USERTOPICLIST_FETCH);
export const invalidateUserTopicList = createAction(USERTOPICLIST_INVALIDATE);

export const fetchUserTopicListRequest = createAction(USERTOPICLIST_FETCH_REQUEST);
export const fetchUserTopicListSuccess = createAction(USERTOPICLIST_FETCH_SUCCESS, null, (...args) => args[1]);
export const fetchUserTopicListFailure = createAction(USERTOPICLIST_FETCH_FAILURE, null, (...args) => args[1]);

// *********************************
// Reducer
// *********************************

const defaultState = {};
const defaultUserTopicListState = {
  isRefreshing: false,
  isEndReached: false,
  didInvalidate: false,
  list: [],
  hasMore: false,
  page: 0,
  errCode: ''
};

export default handleActions({
  [USERTOPICLIST_INVALIDATE]: (state, action) => {
    let { userId, type } = action.payload;
    return {
      ...state,
      [userId]: {
        ..._.get(state, userId, {}),
        [type]: {
          ..._.get(state, [userId, type], defaultUserTopicListState),
          didInvalidate: true
        }
      }
    };
  },
  [USERTOPICLIST_FETCH_REQUEST]: (state, action) => {
    let { userId, type, isEndReached } = action.payload;
    return {
      ...state,
      [userId]: {
        ..._.get(state, userId, {}),
        [type]: {
          ..._.get(state, [userId, type], defaultUserTopicListState),
          isRefreshing: !isEndReached,
          isEndReached: isEndReached,
          didInvalidate: false
        }
      }
    };
  },
  [USERTOPICLIST_FETCH_SUCCESS]: (state, action) => {
    let {
      payload: userTopicList,
      meta: {
        userId,
        type
      }
    } = action;
    return {
      ...state,
      [userId]: {
        ..._.get(state, userId, {}),
        [type]: {
          ..._.get(state, [userId, type], defaultUserTopicListState),
          isRefreshing: false,
          isEndReached: false,
          didInvalidate: false,
          list: getNewCache(state, userTopicList.list, userId, type, userTopicList.page, userTopicList.rs),
          hasMore: !!userTopicList.has_next,
          page: userTopicList.page,
          errCode: userTopicList.errcode
        }
      }
    };
  },
  [USERTOPICLIST_FETCH_FAILURE]: (state, action) => {
    let { userId, type } = action.meta;
    return {
      ...state,
      [userId]: {
        ..._.get(state, userId, {}),
        [type]: {
          ..._.get(state, [userId, type], defaultUserTopicListState),
          isRefreshing: false,
          isEndReached: false,
          didInvalidate: false
        }
      }
    };
  },
  [LOGOUT]: () => defaultState
}, defaultState);

function getNewCache(oldState, userTopicList, userId, type, page, isSuccessful) {
  if (!isSuccessful) { return oldState.list; }

  let newUserTopicList = [];

  if (page !== 1) {
    newUserTopicList = oldState[userId][type].list.concat(userTopicList);
  } else {
    newUserTopicList = userTopicList;
  }

  return newUserTopicList;
}
