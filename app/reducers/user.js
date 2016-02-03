import {
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  SET_AUTHRIZATION,
  REQUEST_LOGOUT,
  RESET_AUTHRIZATION
} from '../constants/ActionTypes';

const defaultUserState = {
  isFetching: false,
  authrization: {},
  hasError: false
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
        hasError: false
      });
    case RECEIVE_LOGIN:
      return Object.assign({}, state, {
        isFetching: false,
        authrization: action.user,
        hasError: !!action.user.errcode
      });
    case REQUEST_LOGOUT:
      return Object.assign({}, state, {
        isFetching: false,
        authrization: {},
        hasError: false
      });
    case RESET_AUTHRIZATION:
      return defaultUserState;
    default:
      return state;
  }
}
