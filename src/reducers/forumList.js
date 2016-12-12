import {
  INVALIDATE_FORUMLIST,
  REQUEST_FORUMLIST,
  REQUEST_SUBFORUMLIST,
  RECEIVE_FORUMLIST,
  REMOVE_CACHE
} from '../constants/ActionTypes';

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
    case INVALIDATE_FORUMLIST:
      return {
        ...state,
        didInvalidate: true
      };
    case REQUEST_FORUMLIST:
      return {
        ...state,
        isFetching: true,
        isSubFetching: false,
        didInvalidate: false
      };
    case REQUEST_SUBFORUMLIST:
      return {
        ...state,
        isFetching: false,
        isSubFetching: true,
        didInvalidate: false
      };
    case RECEIVE_FORUMLIST:
      let {
        boardId,
        forumList
      } = action;

      return {
        ...state,
        isFetching: false,
        isSubFetching: false,
        didInvalidate: false,
        list: getNewCache(state, forumList.list, boardId),
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
