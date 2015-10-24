import {
  INVALIDATE_FORUM,
  REQUEST_FORUM,
  RECEIVE_FORUM
} from '../constants/ActionTypes';

export default function forum(state = {
  isFetching: false,
  didInvalidate: false,
  list: []
}, action) {
  switch (action.type) {
    case INVALIDATE_FORUM:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_FORUM:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_FORUM:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        list: action.forum.list
      });
    default:
      return state;
  }
}
