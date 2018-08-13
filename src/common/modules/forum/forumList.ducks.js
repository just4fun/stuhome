import { createAction, handleActions } from 'redux-actions';
import { LOGOUT } from '~/common/modules/user/session.ducks';
import _ from 'lodash';

// *********************************
// Actions
// *********************************

export const FORUM_LIST_FETCH = 'FORUM_LIST_FETCH';
export const FORUM_LIST_INVALIDATE = 'FORUM_LIST_INVALIDATE';

const FORUM_LIST_FETCH_REQUEST = 'FORUM_LIST_FETCH_REQUEST';
const FORUM_LIST_FETCH_SUCCESS = 'FORUM_LIST_FETCH_SUCCESS';
const FORUM_LIST_FETCH_FAILURE = 'FORUM_LIST_FETCH_FAILURE';

// *********************************
// Action Creators
// *********************************

export const fetchForumList = createAction(FORUM_LIST_FETCH);
export const invalidateForumList = createAction(FORUM_LIST_INVALIDATE);

export const request = createAction(FORUM_LIST_FETCH_REQUEST);
export const success = createAction(FORUM_LIST_FETCH_SUCCESS, null, (...args) => args[1]);
export const failure = createAction(FORUM_LIST_FETCH_FAILURE, null, (...args) => args[1]);

// *********************************
// Reducer
// *********************************

const defaultState = {};
const defaultForumListState = {
  isRefreshing: false,
  didInvalidate: false,
  list: [],
};

export default handleActions({
  [FORUM_LIST_INVALIDATE]: (state, action) => {
    let { boardId } = action.payload;
    return {
      ...state,
      [boardId]: {
        ..._.get(state, boardId, defaultForumListState),
        didInvalidate: true
      }
    };
  },
  [FORUM_LIST_FETCH_REQUEST]: (state, action) => {
    let { boardId } = action.payload;
    return {
      ...state,
      [boardId]: {
        ..._.get(state, boardId, defaultForumListState),
        isRefreshing: true,
        didInvalidate: false
      }
    };
  },
  [FORUM_LIST_FETCH_SUCCESS]: (state, action) => {
    let {
      payload: forumList,
      meta: {
        boardId
      }
    } = action;
    return {
      ...state,
      [boardId]: {
        ..._.get(state, boardId, defaultForumListState),
        isRefreshing: false,
        didInvalidate: false,
        list: forumList.list
      }
    };
  },
  [FORUM_LIST_FETCH_FAILURE]: (state, action) => {
    let { boardId } = action.meta;
    return {
      ...state,
      [boardId]: {
        ..._.get(state, boardId, defaultForumListState),
        isRefreshing: false,
        didInvalidate: false
      }
    };
  },
  [LOGOUT]: () => defaultState
}, defaultState);
