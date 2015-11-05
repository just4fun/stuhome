import {
  REQUEST_TOPIC,
  RECEIVE_TOPIC,
  RESET_TOPIC
} from '../constants/ActionTypes';

const defaultTopicState = {
  isFetching: false,
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
        isFetching: true,
        topic: {},
        list: [],
        hasMore: false,
        page: 0,
        errCode: ''
      });
    case RECEIVE_TOPIC:
      return Object.assign({}, state, {
        isFetching: false,
        topic: action.topicItem.topic,
        list: action.topicItem.list,
        hasMore: action.topicItem.has_next,
        page: action.topicItem.page,
        errCode: action.topicItem.errcode
      });
    case RESET_TOPIC:
      return defaultTopicState;
    default:
      return state;
  }
}
