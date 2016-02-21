import {
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  SET_AUTHRIZATION,
  REQUEST_LOGOUT,
  RESET_AUTHRIZATION,
  RESET_AUTHRIZATION_RESULT
} from '../constants/ActionTypes';

const defaultUserState = {
  isFetching: false,
  authrization: {},
  hasError: false,
  result: false
};

export default function user(state = defaultUserState, action) {
  switch (action.type) {
    case SET_AUTHRIZATION:
      return Object.assign({}, state, {
        authrization: action.user
      });
    case REQUEST_LOGIN:
      return Object.assign({}, state, {
        isFetching: true,
        authrization: {},
        hasError: false,
        result: false
      });
    case RECEIVE_LOGIN:
      return Object.assign({}, state, {
        isFetching: false,
        authrization: action.user,
        hasError: !!action.user.errcode,
        result: !!action.user.rs
      });
    case REQUEST_LOGOUT:
    case RESET_AUTHRIZATION:
      return defaultUserState;
    case RESET_AUTHRIZATION_RESULT:
      return Object.assign({}, state, {
        result: false
      });
    default:
      return state;
  }
}
