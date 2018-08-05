import {
  REQUEST_STARTED,
  REQUEST_COMPELTED,
  REQUEST_FAILED,
  INVALIDATE
} from '~/actions/user/friendListAction';

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
        payload: friendList
      } = action;

      if (friendList.page !== 1 && friendList.list) {
        friendList.list = state.list.concat(friendList.list);
      }

      return {
        ...state,
        isRefreshing: false,
        isEndReached: false,
        didInvalidate: false,
        list: friendList.list || [],
        hasMore: !!friendList.has_next,
        page: friendList.page,
        errCode: friendList.errcode
      };
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
