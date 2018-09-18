import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';
import { LOGOUT } from '~/modules/user/session/session.ducks';

// *********************************
// Actions
// *********************************

export const NOTIFYLIST_FETCH = 'NOTIFYLIST_FETCH';
export const NOTIFYLIST_INVALIDATE = 'NOTIFYLIST_INVALIDATE';

export const NOTIFYLIST_FETCH_SUCCESS = 'NOTIFYLIST_FETCH_SUCCESS';
const NOTIFYLIST_FETCH_FAILURE = 'NOTIFYLIST_FETCH_FAILURE';

export const MARK_AT_ME_AS_READ = 'MARK_AT_ME_AS_READ';
export const MARK_REPLY_AS_READ = 'MARK_REPLY_AS_READ';
export const MARK_SYSTEM_AS_READ = 'MARK_SYSTEM_AS_READ';

// *********************************
// Action Creators
// *********************************

export const fetchNotifyList = createAction(NOTIFYLIST_FETCH);
export const invalidateNotifyList = createAction(NOTIFYLIST_INVALIDATE);

export const fetchNotifyListSuccess = createAction(NOTIFYLIST_FETCH_SUCCESS, null, (...args) => args[1]);
export const fetchNotifyListFailure = createAction(NOTIFYLIST_FETCH_FAILURE, null, (...args) => args[1]);

const markAtMeAsRead = createAction(MARK_AT_ME_AS_READ);
const markReplyAsRead = createAction(MARK_REPLY_AS_READ);
const markSystemAsRead = createAction(MARK_SYSTEM_AS_READ);

// Update unread message count immediately instead of
// clearing them with next poll after 0 ~ 15s.
export const fetchNotifyListSuccessfulCallback = (payload) => {
  switch (payload.notifyType) {
    case 'at':
      return markAtMeAsRead();
    case 'post':
      return markReplyAsRead();
    case 'system':
      return markSystemAsRead();
  }
}

// *********************************
// Reducer
// *********************************

const defaultState = {};
const defaultNotifyListState = {
  isRefreshing: false,
  isEndReached: false,
  didInvalidate: false,
  notifyType: null,
  list: [],
  hasMore: false,
  page: 0,
  errCode: ''
};

export default handleActions({
  [NOTIFYLIST_INVALIDATE]: (state, action) => {
    let { notifyType } = action.payload;
    return {
      ...state,
      [notifyType]: {
        ..._.get(state, notifyType, defaultNotifyListState),
        didInvalidate: true
      }
    };
  },
  [NOTIFYLIST_FETCH]: (state, action) => {
    let { notifyType, isEndReached } = action.payload;
    return {
      ...state,
      [notifyType]: {
        ..._.get(state, notifyType, defaultNotifyListState),
        isRefreshing: !isEndReached,
        isEndReached: isEndReached,
        didInvalidate: false
      }
    };
  },
  [NOTIFYLIST_FETCH_SUCCESS]: (state, action) => {
    let {
      payload: {
        list: newNotifyList,
        body,
        has_next,
        page,
        errcode: errCode
      },
      meta: {
        notifyType
      }
    } = action;

    // `list` is `[]` for `system` type.
    if (notifyType === 'system') {
      newNotifyList = body.data;
    }

    return {
      ...state,
      [notifyType]: {
        ..._.get(state, notifyType, defaultNotifyListState),
        isRefreshing: false,
        isEndReached: false,
        didInvalidate: false,
        notifyType,
        list: page === 1 ? newNotifyList : state[notifyType].list.concat(newNotifyList),
        hasMore: !!has_next,
        page,
        errCode
      }
    };
  },
  [NOTIFYLIST_FETCH_FAILURE]: (state, action) => {
    let { notifyType } = action.meta;
    return {
      ...state,
      [notifyType]: {
        ..._.get(state, notifyType, defaultNotifyListState),
        isRefreshing: false,
        isEndReached: false,
        didInvalidate: false
      }
    };
  },
  [LOGOUT]: () => defaultState
}, defaultState);
