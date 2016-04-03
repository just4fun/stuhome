import {
  INVALIDATE_FORUMLIST,
  REQUEST_FORUMLIST,
  RECEIVE_FORUMLIST
} from '../constants/ActionTypes';

function forumList(state = {
  isFetching: false,
  didInvalidate: false,
  // dictionary for cache
  list: {},
}, action) {
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
        didInvalidate: false,
        // list: action.forumList.list
        list: getNewCache(state, forumList.list, boardId),
      };
    default:
      return state;
  }
}

// cache forum list and return
function getNewCache(oldState, forumList, boardId) {
  let newForumList = [];
  let newState = { ...oldState };

  newForumList = forumList.slice(0);

  newState.list[boardId] = {
    forumList: newForumList
  };
  return newState.list;
}

module.exports = forumList;
