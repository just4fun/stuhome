import {
  REQUEST_STARTED,
  REQUEST_COMPELTED,
  RESET,
  REQUEST_FAILED
} from '../../actions/topic/topicAction';

const defaultTopicState = {
  isFetching: false,
  // indicate fetching via end reached
  isEndReached: false,
  topic: null,
  // comment list
  list: [],
  hasMore: false,
  page: 0,
  errCode: ''
};

export default function topicItem(state = defaultTopicState, action) {
  const { payload } = action;

  switch (action.type) {
    case REQUEST_STARTED:
      return {
        ...state,
        isFetching: !payload.isEndReached,
        isEndReached: payload.isEndReached
      };
    case REQUEST_COMPELTED:
      if (payload.page !== 1) {
        payload.list = state.list.concat(payload.list);
        // the API won't return `topic` field when `page` is not equal `1`
        payload.topic = state.topic;
      }

      return {
        ...state,
        isFetching: false,
        isEndReached: false,
        topic: payload.topic,
        list: payload.list,
        hasMore: !!payload.has_next,
        page: payload.page,
        errCode: payload.errcode
      };
    case RESET:
      return defaultTopicState;
    case REQUEST_FAILED:
      return {
        ...state,
        isFetching: false,
        isEndReached: false
      };
    default:
      return state;
  }
}
