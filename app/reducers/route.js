import {
  CHANGE_ROUTE
} from '../constants/ActionTypes';

export default function route(state = {
  current: {
    id: 'home',
  }
}, action) {
  switch (action.type) {
    case CHANGE_ROUTE:
      return Object.assign({}, state, {
        current: action.route
      });
    default:
      return state;
  }
}
