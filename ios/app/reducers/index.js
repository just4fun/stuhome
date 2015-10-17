import {
  INVALIDATE_TOPIC,
  REQUEST_TOPIC,
  RECEIVE_TOPIC
} from '../constants/ActionTypes';

export default function topics(state = {
  isFetching: false,
  didInvalidate: false,
  topics: []
}, action) {
  switch (action.type) {
    case INVALIDATE_TOPIC:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_TOPIC:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_TOPIC:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        topics: action.topics.list
      });
    default:
      return state;
  }
}
