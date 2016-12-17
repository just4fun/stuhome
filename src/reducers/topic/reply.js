import {
  START_REPLY,
  FINISH_REPLY,
  RESET_REPLY,
  FAILURE_REPLY
} from '../../constants/ActionTypes';

const defaultState = {
  isPublishing: false,
  response: ''
};

export default function reply(state = defaultState, action) {
  switch (action.type) {
    case START_REPLY:
      return {
        ...state,
        isPublishing: true
      };
    case FINISH_REPLY:
      return {
        ...state,
        isPublishing: false,
        response: action.response
      };
    case FAILURE_REPLY:
    case RESET_REPLY:
      return defaultState;
    default:
      return state;
  }
}
