import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';
import {
  MARK_AT_ME_AS_READ,
  MARK_REPLY_AS_READ,
  MARK_SYSTEM_AS_READ
} from '~/modules/message/notifyList.ducks';
import { MARK_PM_AS_READ } from '~/modules/message/pmSessionList/pmSessionList.ducks';
import { LOGOUT } from '~/modules/user/session/session.ducks';

// *********************************
// Actions
// *********************************

export const ALERT_FETCH = 'ALERT_FETCH';
export const ALERT_RESET = 'ALERT_RESET';

const ALERT_FETCH_SUCCESS = 'ALERT_FETCH_SUCCESS';
const ALERT_FETCH_FAILURE = 'ALERT_FETCH_FAILURE';

// *********************************
// Action Creators
// *********************************

export const fetchAlert = createAction(ALERT_FETCH);
export const resetAlert = createAction(ALERT_RESET);

export const fetchAlertSuccess = createAction(ALERT_FETCH_SUCCESS);
export const fetchAlertFailure = createAction(ALERT_FETCH_FAILURE);

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
  [ALERT_FETCH]: (state, action) => ({
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
