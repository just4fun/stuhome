import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';
import { LOGOUT } from '~/common/modules/user/session.ducks';

// *********************************
// Actions
// *********************************

export const NOTIFY_LIST_FETCH = 'NOTIFY_LIST_FETCH';
export const NOTIFY_LIST_INVALIDATE = 'NOTIFY_LIST_INVALIDATE';

const NOTIFY_LIST_FETCH_REQUEST = 'NOTIFY_LIST_FETCH_REQUEST';
const NOTIFY_LIST_FETCH_SUCCESS = 'NOTIFY_LIST_FETCH_SUCCESS';
const NOTIFY_LIST_FETCH_FAILURE = 'NOTIFY_LIST_FETCH_FAILURE';

export const MARK_AT_ME_AS_READ = 'MARK_AT_ME_AS_READ';
export const MARK_REPLY_AS_READ = 'MARK_REPLY_AS_READ';
export const MARK_SYSTEM_AS_READ = 'MARK_SYSTEM_AS_READ';

// *********************************
// Action Creators
// *********************************

export const fetchNotifyList = createAction(NOTIFY_LIST_FETCH);
export const invalidateNotifyList = createAction(NOTIFY_LIST_INVALIDATE);

const markAtMeAsRead = createAction(MARK_AT_ME_AS_READ);
const markReplyAsRead = createAction(MARK_REPLY_AS_READ);
const markSystemAsRead = createAction(MARK_SYSTEM_AS_READ);

// Update unread message count immediately instead of
// clearing them with next poll after 0 ~ 15s.
export const successfulCallback = (payload) => {
  switch (payload.notifyType) {
    case 'at':
      return markAtMeAsRead();
    case 'post':
      return markReplyAsRead();
    case 'system':
      return markSystemAsRead();
  }
}

export const request = createAction(NOTIFY_LIST_FETCH_REQUEST);
export const success = createAction(NOTIFY_LIST_FETCH_SUCCESS, null, (...args) => args[1]);
export const failure = createAction(NOTIFY_LIST_FETCH_FAILURE, null, (...args) => args[1]);

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
  [NOTIFY_LIST_INVALIDATE]: (state, action) => {
    let { notifyType } = action.payload;
    return {
      ...state,
      [notifyType]: {
        ..._.get(state, notifyType, defaultNotifyListState),
        didInvalidate: true
      }
    };
  },
  [NOTIFY_LIST_FETCH_REQUEST]: (state, action) => {
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
  [NOTIFY_LIST_FETCH_SUCCESS]: (state, action) => {
    let {
      payload: notifyList,
      meta: {
        notifyType
      }
    } = action;

    // `list` is `[]` for `system` type.
    if (notifyType === 'system') {
      notifyList.list = notifyList.body.data;
    }

    return {
      ...state,
      [notifyType]: {
        ..._.get(state, notifyType, defaultNotifyListState),
        isRefreshing: false,
        isEndReached: false,
        didInvalidate: false,
        notifyType,
        list: getNewCache(state, notifyList.list, notifyType, notifyList.page),
        hasMore: !!notifyList.has_next,
        page: notifyList.page,
        errCode: notifyList.errcode
      }
    };
  },
  [NOTIFY_LIST_FETCH_FAILURE]: (state, action) => {
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

function getNewCache(oldState, notifyList, notifyType, page) {
  let newNotifyList = [];

  if (page !== 1) {
    newNotifyList = oldState[notifyType].list.concat(notifyList);
  } else {
    newNotifyList = notifyList;
  }

  return newNotifyList;
}
