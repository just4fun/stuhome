import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';

// *********************************
// Actions
// *********************************

export const USER_FETCH = 'USER_FETCH';
export const USER_RESET = 'USER_RESET';

const USER_FETCH_REQUEST = 'USER_FETCH_REQUEST';
const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
const USER_FETCH_FAILURE = 'USER_FETCH_FAILURE';

// *********************************
// Action Creators
// *********************************

export const fetchUser = createAction(USER_FETCH);
export const resetUser = createAction(USER_RESET);

export const request = createAction(USER_FETCH_REQUEST);
export const success = createAction(USER_FETCH_SUCCESS, null, (...args) => args[1]);
export const failure = createAction(USER_FETCH_FAILURE);

// *********************************
// Reducer
// *********************************

const defaultState = {};
const defaultUserState = {
  isFetching: false,
  user: {},
  errCode: ''
};

export default handleActions({
  [USER_FETCH_REQUEST]: (state, action) => {
    let { userId } = action.payload;
    return {
      ...state,
      [userId]: {
        isFetching: true,
        ..._.get(state, userId, defaultUserState)
      }
    };
  },
  [USER_FETCH_SUCCESS]: (state, action) => {
    let {
      payload,
      meta: {
        userId
      }
    } = action;
    return {
      ...state,
      [userId]: {
        ..._.get(state, userId, defaultUserState),
        isFetching: false,
        user: payload,
        errCode: payload.errcode
      }
    };
  },
  [USER_FETCH_FAILURE]: (state, action) => {
    let { userId } = action.payload;
    return {
      ...state,
      [userId]: {
        isFetching: false,
        ..._.get(state, userId, defaultUserState)
      }
    };
  },
  // We didn't cahce user item like topic list, because user information
  // will be updated frequently like published/replied post count.
  //
  // This will be triggerd in `componentWillUnmount()`.
  [USER_RESET]: (state, action) => {
    let { userId } = action.payload;
    return _.pickBy(state, (value, key) => +key !== userId);
  }
}, defaultState);
