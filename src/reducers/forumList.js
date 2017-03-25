import _ from 'lodash';
import {
  INVALIDATE,
  REQUEST_STARTED,
  REQUEST_COMPELTED,
  REQUEST_FAILED
} from '../actions/forumAction';
import { REMOVE_CACHE } from '../actions/authorizeAction';

const defaultState = {};
const defaultForumListState = {
  isRefreshing: false,
  didInvalidate: false,
  list: [],
};

export default function forumList(state = defaultState, action) {
  switch (action.type) {
    case INVALIDATE: {
      let { boardId } = action.payload;

      return {
        ...state,
        [boardId]: {
          ..._.get(state, boardId, defaultForumListState),
          didInvalidate: true
        }
      };
    }
    case REQUEST_STARTED: {
      let { boardId } = action.payload;

      return {
        ...state,
        [boardId]: {
          ..._.get(state, boardId, defaultForumListState),
          isRefreshing: true,
          didInvalidate: false
        }
      };
    }
    case REQUEST_COMPELTED:
      let {
        payload: forumList,
        meta: {
          boardId
        }
      } = action;

      return {
        ...state,
        [boardId]: {
          ..._.get(state, boardId, defaultForumListState),
          isRefreshing: false,
          didInvalidate: false,
          list: forumList.list
        }
      };
    case REQUEST_FAILED: {
      let { boardId } = action.meta;

      return {
        ...state,
        [boardId]: {
          ..._.get(state, boardId, defaultForumListState),
          isRefreshing: false,
          didInvalidate: false
        }
      };
    }
    case REMOVE_CACHE:
      return defaultState;
    default:
      return state;
  }
}
