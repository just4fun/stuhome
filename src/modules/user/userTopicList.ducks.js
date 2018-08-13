import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';
import { LOGOUT } from '~/modules/user/session.ducks';

// *********************************
// Actions
// *********************************

export const USER_TOPIC_LIST_FETCH = 'USER_TOPIC_LIST_FETCH';
export const USER_TOPIC_LIST_INVALIDATE = 'USER_TOPIC_LIST_INVALIDATE';

const USER_TOPIC_LIST_FETCH_REQUEST = 'USER_TOPIC_LIST_FETCH_REQUEST';
const USER_TOPIC_LIST_FETCH_SUCCESS = 'USER_TOPIC_LIST_FETCH_SUCCESS';
const USER_TOPIC_LIST_FETCH_FAILURE = 'USER_TOPIC_LIST_FETCH_FAILURE';

// *********************************
// Action Creators
// *********************************

export const fetchUserTopicList = createAction(USER_TOPIC_LIST_FETCH);
export const invalidateUserTopicList = createAction(USER_TOPIC_LIST_INVALIDATE);

export const request = createAction(USER_TOPIC_LIST_FETCH_REQUEST);
export const success = createAction(USER_TOPIC_LIST_FETCH_SUCCESS, null, (...args) => args[1]);
export const failure = createAction(USER_TOPIC_LIST_FETCH_FAILURE, null, (...args) => args[1]);

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
  [USER_TOPIC_LIST_INVALIDATE]: (state, action) => {
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
  [USER_TOPIC_LIST_FETCH_REQUEST]: (state, action) => {
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
  [USER_TOPIC_LIST_FETCH_SUCCESS]: (state, action) => {
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
  [USER_TOPIC_LIST_FETCH_FAILURE]: (state, action) => {
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
