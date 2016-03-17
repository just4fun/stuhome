import {
  INVALIDATE_FORUMLIST,
  REQUEST_FORUMLIST,
  RECEIVE_FORUMLIST
} from '../constants/ActionTypes';

function forumList(state = {
  isFetching: false,
  didInvalidate: false,
  list: []
}, action) {
  switch (action.type) {
    case INVALIDATE_FORUMLIST:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_FORUMLIST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_FORUMLIST:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        list: action.forumList.list
      });
    default:
      return state;
  }
}

module.exports = forumList;