import {
  START_VOTE,
  FINISH_VOTE,
  RESET_VOTE
} from '../../constants/ActionTypes';

const defaultState = {
  isVoting: false,
  response: ''
};

export default function vote(state = defaultState, action) {
  switch (action.type) {
    case START_VOTE:
      return {
        ...state,
        isVoting: true
      };
    case FINISH_VOTE:
      return {
        ...state,
        isVoting: false,
        response: action.response
      };
    case RESET_VOTE:
      return defaultState;
    default:
      return state;
  }
}
