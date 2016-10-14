import {
  INVALIDATE_SEARCH,
  REQUEST_SEARCH,
  RECEIVE_SEARCH,
  RESET_SEARCH
} from '../../constants/ActionTypes';

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
    case INVALIDATE_SEARCH:
      return {
        ...state,
        didInvalidate: true
      };
    case REQUEST_SEARCH:
      return {
        ...state,
        isRefreshing: !action.isEndReached,
        isEndReached: action.isEndReached,
        didInvalidate: false
      };
    case RECEIVE_SEARCH:
      let { topicList } = action;

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
    case RESET_SEARCH:
      return defaultSearchState;
    default:
      return state;
  }
}
