import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';

// *********************************
// Actions
// *********************************

export const PM_LIST_FETCH = 'PM_LIST_FETCH';
export const PM_LIST_RESET = 'PM_LIST_RESET';
export const PM_LIST_RESPONSE_STATUS_RESET = 'PM_LIST_RESPONSE_STATUS_RESET';

const PM_LIST_FETCH_REQUEST = 'PM_LIST_FETCH_REQUEST';
const PM_LIST_FETCH_SUCCESS = 'PM_LIST_FETCH_SUCCESS';
const PM_LIST_FETCH_FAILURE = 'PM_LIST_FETCH_FAILURE';

// *********************************
// Action Creators
// *********************************

export const fetchPmList = createAction(PM_LIST_FETCH);
export const resetPmList = createAction(PM_LIST_RESET);
export const resetPmListResponseStatus = createAction(PM_LIST_RESPONSE_STATUS_RESET);

export const request = createAction(PM_LIST_FETCH_REQUEST);
export const success = createAction(PM_LIST_FETCH_SUCCESS, null, (...args) => args[1]);
export const failure = createAction(PM_LIST_FETCH_FAILURE);

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
  [PM_LIST_FETCH_REQUEST]: (state, action) => ({
    ...state,
    isRefreshing: true
  }),
  [PM_LIST_FETCH_SUCCESS]: (state, action) => {
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
  [PM_LIST_FETCH_FAILURE]: (state, action) => ({
    ...state,
    isRefreshing: false
  }),
  [PM_LIST_RESET]: () => defaultPmListState,
  [PM_LIST_RESPONSE_STATUS_RESET]: (state, action) => ({
    ...state,
    response: ''
  })
}, defaultPmListState);
