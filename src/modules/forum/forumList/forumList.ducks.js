import { createAction, handleActions } from 'redux-actions';
import { LOGOUT } from '~/modules/user/session.ducks';
import _ from 'lodash';

// *********************************
// Actions
// *********************************

export const FORUMLIST_FETCH = 'FORUMLIST_FETCH';
export const FORUMLIST_INVALIDATE = 'FORUMLIST_INVALIDATE';

const FORUMLIST_FETCH_SUCCESS = 'FORUMLIST_FETCH_SUCCESS';
const FORUMLIST_FETCH_FAILURE = 'FORUMLIST_FETCH_FAILURE';

// *********************************
// Action Creators
// *********************************

export const fetchForumList = createAction(FORUMLIST_FETCH);
export const invalidateForumList = createAction(FORUMLIST_INVALIDATE);

export const fetchForumListSuccess = createAction(FORUMLIST_FETCH_SUCCESS, null, (...args) => args[1]);
export const fetchForumListFailure = createAction(FORUMLIST_FETCH_FAILURE, null, (...args) => args[1]);

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
  [FORUMLIST_INVALIDATE]: (state, action) => {
    let { boardId } = action.payload;
    return {
      ...state,
      [boardId]: {
        ..._.get(state, boardId, defaultForumListState),
        didInvalidate: true
      }
    };
  },
  [FORUMLIST_FETCH]: (state, action) => {
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
  [FORUMLIST_FETCH_SUCCESS]: (state, action) => {
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
  [FORUMLIST_FETCH_FAILURE]: (state, action) => {
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
