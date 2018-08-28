import { createAction, handleActions } from 'redux-actions';

// *********************************
// Actions
// *********************************

export const USER_FETCH = 'USER_FETCH';
export const USER_CANCEL = 'USER_CANCEL';
export const USER_RESET = 'USER_RESET';

const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
const USER_FETCH_FAILURE = 'USER_FETCH_FAILURE';

// *********************************
// Action Creators
// *********************************

export const fetchUser = createAction(USER_FETCH);
export const cancelUser = createAction(USER_CANCEL);
export const resetUser = createAction(USER_RESET);

export const fetchUserSuccess = createAction(USER_FETCH_SUCCESS);
export const fetchUserFailure = createAction(USER_FETCH_FAILURE);

// *********************************
// Reducer
// *********************************

const defaultUserState = {
  isFetching: false,
  user: null
};

export default handleActions({
  [USER_FETCH]: (state, action) => ({
    ...state,
    isFetching: true
  }),
  [USER_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    user: action.payload
  }),
  [USER_FETCH_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false
  }),
  // We didn't cahce user item like topic list, because user information
  // will be updated frequently like published/replied post count.
  //
  // This will be triggerd in `componentWillUnmount()`.
  [USER_RESET]: () => defaultUserState
}, defaultUserState);
