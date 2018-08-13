import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';
import {
  MARK_AT_ME_AS_READ,
  MARK_REPLY_AS_READ,
  MARK_SYSTEM_AS_READ
} from '~/common/modules/message/notifyList.ducks';
import { MARK_PM_AS_READ } from '~/common/modules/message/pmSessionList.ducks';
import { LOGOUT } from '~/common/modules/user/session.ducks';

// *********************************
// Actions
// *********************************

export const ALERT_FETCH = 'ALERT_FETCH';
export const ALERT_RESET = 'ALERT_RESET';

const ALERT_FETCH_REQUEST = 'ALERT_FETCH_REQUEST';
const ALERT_FETCH_SUCCESS = 'ALERT_FETCH_SUCCESS';
const ALERT_FETCH_FAILURE = 'ALERT_FETCH_FAILURE';

// *********************************
// Action Creators
// *********************************

export const fetchAlert = createAction(ALERT_FETCH);
export const resetAlert = createAction(ALERT_RESET);

export const request = createAction(ALERT_FETCH_REQUEST);
export const success = createAction(ALERT_FETCH_SUCCESS, null, (...args) => args[1]);
export const failure = createAction(ALERT_FETCH_FAILURE);

// *********************************
// Reducer
// *********************************

const defaultAlertState = {
  isFetching: false,
  response: {
    atMeInfo: { count: 0 },
    replyInfo: { count: 0 },
    pmInfos: [],
    systemInfo: { count: 0 }
  }
};

export default handleActions({
  [ALERT_FETCH_REQUEST]: (state, action) => ({
    ...state,
    isFetching: true
  }),
  [ALERT_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    response: action.payload.body
  }),
  [ALERT_FETCH_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false
  }),
  [MARK_AT_ME_AS_READ]: (state, action) => ({
    ...state,
    response: {
      ...state.response,
      atMeInfo: { count: 0 }
    }
  }),
  [MARK_REPLY_AS_READ]: (state, action) => ({
    ...state,
    response: {
      ...state.response,
      replyInfo: { count: 0 },
    }
  }),
  [MARK_PM_AS_READ]: (state, action) => {
    let { plid } = action.payload;
    return {
      ...state,
      response: {
        ...state.response,
        pmInfos: state.response.pmInfos.filter(item => item.plid !== plid)
      }
    };
  },
  [MARK_SYSTEM_AS_READ]: (state, action) => ({
    ...state,
    response: {
      ...state.response,
      systemInfo: { count: 0 },
    }
  }),
  [ALERT_RESET]: () => defaultAlertState,
  [LOGOUT]: () => defaultAlertState
}, defaultAlertState);
