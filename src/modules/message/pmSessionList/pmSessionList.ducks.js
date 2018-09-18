import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';
import { LOGOUT } from '~/modules/user/session/session.ducks';

// *********************************
// Actions
// *********************************

export const PMSESSIONLIST_FETCH = 'PMSESSIONLIST_FETCH';
export const PMSESSIONLIST_INVALIDATE = 'PMSESSIONLIST_INVALIDATE';

const PMSESSIONLIST_FETCH_SUCCESS = 'PMSESSIONLIST_FETCH_SUCCESS';
const PMSESSIONLIST_FETCH_FAILURE = 'PMSESSIONLIST_FETCH_FAILURE';

export const MARK_PM_AS_READ = 'MARK_PM_AS_READ';

// *********************************
// Action Creators
// *********************************

export const fetchPmSessionList = createAction(PMSESSIONLIST_FETCH);
export const invalidatePmSessionList = createAction(PMSESSIONLIST_INVALIDATE);

export const markPmAsRead = createAction(MARK_PM_AS_READ);

export const fetchPmSessionListSuccess = createAction(PMSESSIONLIST_FETCH_SUCCESS, null, (...args) => args[1]);
export const fetchPmSessionListFailure = createAction(PMSESSIONLIST_FETCH_FAILURE);

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
  [PMSESSIONLIST_INVALIDATE]: (state, action) => ({
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
  [PMSESSIONLIST_FETCH]: (state, action) => {
    let { isEndReached } = action.payload;
    return {
      ...state,
      isRefreshing: !isEndReached,
      isEndReached: isEndReached,
      didInvalidate: false
    };
  },
  [PMSESSIONLIST_FETCH_SUCCESS]: (state, action) => {
    let {
      payload: {
        body: {
          list: newPmSessionList,
          hasNext
        },
        errcode: errCode
      },
      meta: {
        page
      }
    } = action;

    return {
      ...state,
      isRefreshing: false,
      isEndReached: false,
      didInvalidate: false,
      list: page === 1 ? newPmSessionList : state.list.concat(newPmSessionList),
      hasMore: !!hasNext,
      page,
      errCode
    };
  },
  [PMSESSIONLIST_FETCH_FAILURE]: (state, action) => ({
    ...state,
    isRefreshing: false,
    isEndReached: false,
    didInvalidate: false
  }),
  [LOGOUT]: () => defaultPmSessionListState
}, defaultPmSessionListState);
