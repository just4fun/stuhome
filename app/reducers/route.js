import {
  CHANGE_ROUTE
} from '../constants/ActionTypes';

function route(state = {
  current: {
    id: 'home',
  }
}, action) {
  switch (action.type) {
    case CHANGE_ROUTE:
      return {
        ...state,
        current: action.route
      };
    default:
      return state;
  }
}

module.exports = route;
