import {
  REQUEST_STARTED,
  REQUEST_COMPELTED,
  RESET,
  REQUEST_FAILED
} from '../../actions/topic/voteAction';

const defaultState = {
  isVoting: false,
  response: ''
};

export default function vote(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_STARTED:
      return {
        ...state,
        isVoting: true
      };
    case REQUEST_COMPELTED:
      return {
        ...state,
        isVoting: false,
        response: action.payload
      };
    case REQUEST_FAILED:
    case RESET:
      return defaultState;
    default:
      return state;
  }
}
