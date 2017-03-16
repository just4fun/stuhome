import {
  INVALIDATE,
  REQUEST_TOPFORUM_STARTED,
  REQUEST_SUBFORUM_STARTED,
  REQUEST_COMPELTED,
  REQUEST_FAILED
} from '../actions/forumAction';
import { REMOVE_CACHE } from '../actions/authorizeAction';

const defaultForumListState = {
  // indicate fetching top forums
  isFetching: false,
  // indicate fetching sub forums
  isSubFetching: false,
  didInvalidate: false,
  // dictionary for cache
  list: {},
};

export default function forumList(state = defaultForumListState, action) {
  switch (action.type) {
    case INVALIDATE:
      return {
        ...state,
        didInvalidate: true
      };
    case REQUEST_TOPFORUM_STARTED:
      return {
        ...state,
        isFetching: true,
        isSubFetching: false,
        didInvalidate: false
      };
    case REQUEST_SUBFORUM_STARTED:
      return {
        ...state,
        isFetching: false,
        isSubFetching: true,
        didInvalidate: false
      };
    case REQUEST_COMPELTED:
      let {
        payload: forumList,
        meta: {
          boardId
        }
      } = action;

      return {
        ...state,
        isFetching: false,
        isSubFetching: false,
        didInvalidate: false,
        list: getNewCache(state, forumList.list, boardId),
      };
    case REQUEST_FAILED:
      return {
        ...state,
        isFetching: false,
        isSubFetching: false,
        didInvalidate: false
      };
    case REMOVE_CACHE:
      return defaultForumListState;
    default:
      return state;
  }
}

// cache forum list and return
function getNewCache(oldState, forumList, boardId) {
  return {
    ...oldState.list,
    [boardId]: { forumList }
  };
}
