import {
  REQUEST_STARTED,
  REQUEST_COMPELTED,
  RESET,
  REQUEST_FAILED
} from '../../actions/message/sendAction';

const defaultState = {
  isPublishing: false,
  response: ''
};

export default function publish(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_STARTED:
      return {
        ...state,
        isPublishing: true
      };
    case REQUEST_COMPELTED:
      return {
        ...state,
        isPublishing: false,
        response: action.payload
      };
    case REQUEST_FAILED:
      // if the time between sending two messages is too short,
      // the action will be `REQUEST_COMPELTED` with response
      // { rs: 0, errocde: '两次发送短消息太快，请稍后再发送' },
      // so we set `errocde` to empty here to distinguish no
      // network or other failed situation from it.
      return {
        ...state,
        isPublishing: false,
        response: {
          rs: 0,
          errcode: ''
        }
      };
    case RESET:
      return defaultState;
    default:
      return state;
  }
}
