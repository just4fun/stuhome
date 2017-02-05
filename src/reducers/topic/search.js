import {
  INVALIDATE,
  REQUEST_STARTED,
  REQUEST_COMPELTED,
  RESET,
  REQUEST_FAILED
} from '../../actions/topic/searchAction';

const defaultSearchState = {
  // indicate fetching via pull to refresh
  isRefreshing: false,
  // indicate fetching via end reached
  isEndReached: false,
  didInvalidate: false,
  list: [],
  hasMore: false,
  page: 0,
  errCode: ''
};

export default function search(state = defaultSearchState, action) {
  switch (action.type) {
    case INVALIDATE:
      return {
        ...state,
        didInvalidate: true
      };
    case REQUEST_STARTED:
      return {
        ...state,
        isRefreshing: !action.payload.isEndReached,
        isEndReached: action.payload.isEndReached,
        didInvalidate: false
      };
    case REQUEST_COMPELTED:
      let {
        payload: topicList
      } = action;

      // if there is no search result, both `page`
      // and `list` will return `undefined`.
      if (topicList.page !== 1 && topicList.list) {
        topicList.list = state.list.concat(topicList.list);
      }

      return {
        ...state,
        isRefreshing: false,
        isEndReached: false,
        didInvalidate: false,
        list: topicList.list || [],
        hasMore: !!topicList.has_next,
        page: topicList.page,
        errCode: topicList.errcode
      };
    case RESET:
      return defaultSearchState;
    case REQUEST_FAILED:
      return {
        ...state,
        isRefreshing: false,
        isEndReached: false,
        didInvalidate: false
      };
    default:
      return state;
  }
}
