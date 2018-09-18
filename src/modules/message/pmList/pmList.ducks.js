import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';

// *********************************
// Actions
// *********************************

export const PMLIST_FETCH = 'PMLIST_FETCH';
export const PMLIST_CANCEL = 'PMLIST_CANCEL';
export const PMLIST_RESET = 'PMLIST_RESET';
export const PMLIST_RESPONSE_STATUS_RESET = 'PMLIST_RESPONSE_STATUS_RESET';

const PMLIST_FETCH_SUCCESS = 'PMLIST_FETCH_SUCCESS';
const PMLIST_FETCH_FAILURE = 'PMLIST_FETCH_FAILURE';

// *********************************
// Action Creators
// *********************************

export const fetchPmList = createAction(PMLIST_FETCH);
export const cancelPmList = createAction(PMLIST_CANCEL);
export const resetPmList = createAction(PMLIST_RESET);
export const resetPmListResponseStatus = createAction(PMLIST_RESPONSE_STATUS_RESET);

export const fetchPmListSuccess = createAction(PMLIST_FETCH_SUCCESS, null, (...args) => args[1]);
export const fetchPmListFailure = createAction(PMLIST_FETCH_FAILURE);

// *********************************
// Reducer
// *********************************

const defaultPmListState = {
  isRefreshing: false,
  list: [],
  hasPrev: false,
  page: 0,
  errCode: '',
  user: '',
  response: ''
};

export default handleActions({
  [PMLIST_FETCH]: (state, action) => ({
    ...state,
    isRefreshing: true
  }),
  [PMLIST_FETCH_SUCCESS]: (state, action) => {
    let {
      meta,
      payload,
      payload: {
        body: {
          pmList
        }
      }
    } = action;

    let msgList = null;

    if (meta.page !== 1) {
      msgList = state.list.concat(pmList[0].msgList.reverse());
    } else {
      msgList = pmList[0].msgList.reverse();
    }

    return {
      ...state,
      isRefreshing: false,
      list: msgList,
      hasPrev: !!pmList[0].hasPrev,
      page: meta.page,
      errCode: payload.errcode,
      user: {
        id: pmList[0].fromUid,
        name: pmList[0].name,
        avatar: pmList[0].avatar
      },
      response: payload
    };
  },
  [PMLIST_FETCH_FAILURE]: (state, action) => ({
    ...state,
    isRefreshing: false
  }),
  [PMLIST_RESET]: () => defaultPmListState,
  [PMLIST_RESPONSE_STATUS_RESET]: (state, action) => ({
    ...state,
    response: ''
  })
}, defaultPmListState);
