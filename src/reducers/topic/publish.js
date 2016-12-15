import {
  START_PUBLISH,
  FINISH_PUBLISH,
  RESET_PUBLISH,
  FAILURE
} from '../../constants/ActionTypes';

const defaultState = {
  isPublishing: false,
  response: ''
};

export default function publish(state = defaultState, action) {
  switch (action.type) {
    case START_PUBLISH:
      return {
        ...state,
        isPublishing: true
      };
    case FINISH_PUBLISH:
      return {
        ...state,
        isPublishing: false,
        response: action.response
      };
    case FAILURE:
    case RESET_PUBLISH:
      return defaultState;
    default:
      return state;
  }
}
