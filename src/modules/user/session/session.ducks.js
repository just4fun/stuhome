import { createAction, handleActions } from 'redux-actions';

// *********************************
// Actions
// *********************************

export const LOGIN = 'LOGIN';

export const SESSION_RETRIEVE = 'SESSION_RETRIEVE';
export const SESSION_SET = 'SESSION_SET';
export const SESSION_RESET = 'SESSION_RESET';
export const SESSION_RESULT_RESET = 'SESSION_RESULT_RESET';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT = 'LOGOUT';

// *********************************
// Action Creators
// *********************************

export const login = createAction(LOGIN);

export const retrieveSessionFromStorage = createAction(SESSION_RETRIEVE);
export const setSession = createAction(SESSION_SET);
export const resetSession = createAction(SESSION_RESET);
export const resetSessionResult = createAction(SESSION_RESULT_RESET);

export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFailure = createAction(LOGIN_FAILURE);

export const logout = createAction(LOGOUT);

// *********************************
// Reducer
// *********************************

const defaultSessionState = {
  isFetching: false,
  data: {},
  hasError: false,
  result: false
};

export default handleActions({
  [SESSION_SET]: (state, action) => ({
    ...state,
    data: action.payload
  }),
  [LOGIN]: (state, action) => ({
    ...state,
    isFetching: true
  }),
  [LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    data: action.payload,
    hasError: !!action.payload.errcode,
    result: !!action.payload.rs
  }),
  [LOGIN_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false
  }),
  [SESSION_RESET]: () => defaultSessionState,
  [SESSION_RESULT_RESET]: (state, action) => ({
    ...state,
    result: false
  }),
  [LOGOUT]: (state, action) => {
    if (!action.payload.isLogin) {
      return defaultSessionState;
    }
    return state;
  }
}, defaultSessionState);
