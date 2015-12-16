import {
  START_PUBLISH,
  FINISH_PUBLISH,
  RESET_PUBLISH
} from '../constants/ActionTypes';

const defaultState = {
  isPublishing: false,
  response: ''
};

export default function comment(state = defaultState, action) {
  switch (action.type) {
    case START_PUBLISH:
      return Object.assign({}, state, {
        isPublishing: true
      });
    case FINISH_PUBLISH:
      return Object.assign({}, state, {
        isPublishing: false,
        response: action.response
      });
    case RESET_PUBLISH:
      return defaultState;
    default:
      return state;
  }
}
