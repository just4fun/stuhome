import {
  REQUEST_STARTED,
  REQUEST_COMPELTED,
  RESET,
  REQUEST_FAILED
} from '../../actions/topic/favorAction';

const defaultState = {
  isFavoring: false,
  response: ''
};

export default function favor(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_STARTED:
      return {
        ...state,
        isFavoring: true
      };
    case REQUEST_COMPELTED:
      return {
        ...state,
        isFavoring: false,
        response: action.payload
      };
    case REQUEST_FAILED:
    case RESET:
      return defaultState;
    default:
      return state;
  }
}
