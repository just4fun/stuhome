import {
  INVALIDATE_TOPICLIST,
  REQUEST_TOPICLIST,
  RECEIVE_TOPICLIST
} from '../constants/ActionTypes';

export default function topic(state = {
  isFetching: false,
  didInvalidate: false,
  list: [],
  hasMore: false,
  page: 0
}, action) {
  switch (action.type) {
    case INVALIDATE_TOPICLIST:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_TOPICLIST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_TOPICLIST:
      if (action.topic.page !== 1) {
        action.topic.list = state.list.concat(action.topic.list);
      }

      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        list: action.topic.list,
        hasMore: action.topic.has_next,
        page: action.topic.page
      });
    default:
      return state;
  }
}
