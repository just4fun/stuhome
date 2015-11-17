import {
  REQUEST_TOPIC,
  RECEIVE_TOPIC,
  RESET_TOPIC
} from '../constants/ActionTypes';

const defaultTopicState = {
  isFetching: false,
  // indicate fetching via end reached
  isEndReached: false,
  topic: {},
  // comment list
  list: [],
  hasMore: false,
  page: 0,
  errCode: ''
};

export default function topicItem(state = defaultTopicState, action) {
  switch (action.type) {
    case REQUEST_TOPIC:
      return Object.assign({}, state, {
        isFetching: !action.isEndReached,
        isEndReached: action.isEndReached
      });
    case RECEIVE_TOPIC:
      if (action.topicItem.page !== 1) {
        action.topicItem.list = state.list.concat(action.topicItem.list);
        // the API won't return `topic` field when `page` is not equal `1`
        action.topicItem.topic = state.topic;
      }

      return Object.assign({}, state, {
        isFetching: false,
        isEndReached: false,
        topic: action.topicItem.topic,
        list: action.topicItem.list,
        hasMore: !!action.topicItem.has_next,
        page: action.topicItem.page,
        errCode: action.topicItem.errcode
      });
    case RESET_TOPIC:
      return defaultTopicState;
    default:
      return state;
  }
}
