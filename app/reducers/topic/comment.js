import {
  START_PUBLISH,
  FINISH_PUBLISH,
  RESET_PUBLISH
} from '../../constants/ActionTypes';

const defaultState = {
  isPublishing: false,
  response: ''
};

function comment(state = defaultState, action) {
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
    case RESET_PUBLISH:
      return defaultState;
    default:
      return state;
  }
}

module.exports = comment;
