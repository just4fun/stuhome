import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';
import { LOGOUT } from '~/modules/user/session/session.ducks';

// *********************************
// Actions
// *********************************

export const PM_SESSION_LIST_FETCH = 'PM_SESSION_LIST_FETCH';
export const PM_SESSION_LIST_INVALIDATE = 'PM_SESSION_LIST_INVALIDATE';

const PM_SESSION_LIST_FETCH_REQUEST = 'PM_SESSION_LIST_FETCH_REQUEST';
const PM_SESSION_LIST_FETCH_SUCCESS = 'PM_SESSION_LIST_FETCH_SUCCESS';
const PM_SESSION_LIST_FETCH_FAILURE = 'PM_SESSION_LIST_FETCH_FAILURE';

export const MARK_PM_AS_READ = 'MARK_PM_AS_READ';

// *********************************
// Action Creators
// *********************************

export const fetchPmSessionList = createAction(PM_SESSION_LIST_FETCH);
export const invalidatePmSessionList = createAction(PM_SESSION_LIST_INVALIDATE);

export const markPmAsRead = createAction(MARK_PM_AS_READ);

export const request = createAction(PM_SESSION_LIST_FETCH_REQUEST);
export const success = createAction(PM_SESSION_LIST_FETCH_SUCCESS, null, (...args) => args[1]);
export const failure = createAction(PM_SESSION_LIST_FETCH_FAILURE, null, (...args) => args[1]);

// *********************************
// Reducer
// *********************************

const defaultPmSessionListState = {
  isRefreshing: false,
  isEndReached: false,
  didInvalidate: false,
  list: [],
  hasMore: false,
  page: 0,
  errCode: ''
};

export default handleActions({
  [PM_SESSION_LIST_INVALIDATE]: (state, action) => ({
    ...state,
    didInvalidate: true
  }),
  [MARK_PM_AS_READ]: (state, action) => {
    let { plid } = action.payload;
    return {
      ...state,
      list: state.list.map(item => {
        if (item.plid === plid) {
          item.isNew = false;
        }
        return item;
      })
    };
  },
  [PM_SESSION_LIST_FETCH_REQUEST]: (state, action) => {
    let { isEndReached } = action.payload;
    return {
      ...state,
      isRefreshing: !isEndReached,
      isEndReached: isEndReached,
      didInvalidate: false
    };
  },
  [PM_SESSION_LIST_FETCH_SUCCESS]: (state, action) => {
    let {
      meta,
      payload,
      payload: {
        body: pmSessionList
      }
    } = action;

    return {
      ...state,
      isRefreshing: false,
      isEndReached: false,
      didInvalidate: false,
      list: getNewCache(state, pmSessionList.list, meta.page),
      hasMore: !!pmSessionList.hasNext,
      page: meta.page,
      errCode: payload.errcode
    };
  },
  [PM_SESSION_LIST_FETCH_FAILURE]: (state, action) => ({
    ...state,
    isRefreshing: false,
    isEndReached: false,
    didInvalidate: false
  }),
  [LOGOUT]: () => defaultPmSessionListState
}, defaultPmSessionListState);

function getNewCache(oldState, pmSessionList, page) {
  let newPmSessionList = [];

  if (page !== 1) {
    newPmSessionList = oldState.list.concat(pmSessionList);
  } else {
    newPmSessionList = pmSessionList;
  }

  return newPmSessionList;
}
