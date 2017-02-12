import {
  REQUEST_STARTED,
  REQUEST_COMPELTED,
  REQUEST_FAILED,
  SET_AUTHRIZATION,
  REMOVE_CACHE,
  RESET_AUTHRIZATION,
  RESET_AUTHRIZATION_RESULT
} from '../actions/authorizeAction';

const defaultUserState = {
  isFetching: false,
  authrization: {},
  hasError: false,
  result: false
};

export default function user(state = defaultUserState, action) {
  switch (action.type) {
    case SET_AUTHRIZATION:
      return {
        ...state,
        authrization: action.payload
      };
    case REQUEST_STARTED:
      return {
        ...state,
        isFetching: true,
        authrization: {},
        hasError: false,
        result: false
      };
    case REQUEST_COMPELTED:
      return {
        ...state,
        isFetching: false,
        authrization: action.payload,
        hasError: !!action.payload.errcode,
        result: !!action.payload.rs
      };
    case REQUEST_FAILED:
      return {
        ...state,
        isFetching: false
      };
    case REMOVE_CACHE:
      if (!action.payload.isLogin) {
        return defaultUserState;
      }
      return state;
    case RESET_AUTHRIZATION:
      return defaultUserState;
    case RESET_AUTHRIZATION_RESULT:
      return {
        ...state,
        result: false
      };
    default:
      return state;
  }
}
