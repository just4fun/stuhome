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
    case RESET:
      return defaultState;
    default:
      return state;
  }
}
