import {
  REQUEST_TOPIC,
  RECEIVE_TOPIC
} from '../constants/ActionTypes';

export default function topics(state = {
  isFetching: false,
  topics: []
}, action) {
  switch (action.type) {
    case REQUEST_TOPIC:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_TOPIC:
      return Object.assign({}, state, {
        isFetching: false,
        topics: action.topics.list
      });
    default:
      return state;
  }
}
